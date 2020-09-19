import {
    assertEquals
  } from "https://deno.land/std/testing/asserts.ts";
import { RouterContext, Application } from "https://deno.land/x/oak/mod.ts";
import { stub, Stub } from "https://deno.land/x/mock/stub.ts";
import * as Colors from 'https://deno.land/std/fmt/colors.ts';

import { EnrolleeService } from "./enrolleeService.ts";
import { Enrollee, enrollees } from "./enrollees.ts";


const enrolleeId = '36653835-fbe0-4c42-a93c-3e561823934f';
const nonMatchingEnrolleeId = '5f420f21-7c89-442c-a722-95e5df157c27';
const mockEnrollee = {
    active: true,
    name: 'Mock Enrollee',
    dateOfBirth: '1950-05-05'
};

Deno.test('Creates an EnrolleeService', () => {
    const service: EnrolleeService = new EnrolleeService();
    assertEquals(!!service, true);
});

Deno.test('Gets all enrollees', () => {
    const service: EnrolleeService = new EnrolleeService();
    const context: RouterContext = {
        response: {
            body: ''
        }
    }  as RouterContext;

    service.getEnrollees(context);
    assertEquals((context.response.body as string[]).length, 21);
});

Deno.test('Gets a specific enrollee - success response', () => {
    const service: EnrolleeService = new EnrolleeService();
    const context: RouterContext = {
        params: {
            id: enrolleeId
        } as any,
        response: {
            body: {}
        }
    }  as RouterContext;

    service.getEnrollee(context);
    assertEquals(context.response.status, 200);
    assertEquals((context.response.body as any).id, context.params.id);
});

Deno.test('Get a specific enrollee - no id - error response', () => {
    validateGetError(undefined, 400, 'Please supply an enrollee id');
});

Deno.test('Get a specific enrollee - no matching id - error response', () => {
    validateGetError(nonMatchingEnrolleeId, 404, undefined);
});

Deno.test('Get a specific enrollee - invalid id - error response', () => {
    validateGetError('mockId', 500, 'Internal server error');
});

Deno.test('Update an enrollee - success response', async () => {
    const service: EnrolleeService = new EnrolleeService();
    const context: RouterContext = {
        params: {
            id: enrolleeId
        } as any,
        request: {
            body: () => {
                return {
                    value: new Promise<Enrollee>((resolve) => {
                        resolve({...mockEnrollee});
                    })
                };
            }
        },
        response: {
        }
    }  as RouterContext;
    
    await service.updateEnrollee(context);
    assertEquals(context.response.status, 200);
    assertEquals((context.response.body as any).id, context.params.id);
});

Deno.test('Update an enrollee - missing body - error response', async () => {
    await validateUpdateError(undefined, 400, 'Please supply a body');
});

Deno.test('Update an enrollee - mismatched id - error response', async () => {
    const wrongEnrollee = {id: 'wrongId', ...mockEnrollee};

    await validateUpdateError(wrongEnrollee, 400, 'The id specified in the request body does not match the id in the path parameter');
});

Deno.test('Update an enrollee - missing name property - error response', async () => {
    const noNameEnrollee = {...mockEnrollee};
    delete noNameEnrollee.name;

    await validateUpdateError(noNameEnrollee, 400, 'Please supply an enrollee name');
});

Deno.test('Update an enrollee - missing active property - error response', async () => {
    const noActiveEnrollee = {...mockEnrollee};
    delete noActiveEnrollee.active;

    await validateUpdateError(noActiveEnrollee, 400, 'Please supply a value for the active property');
});

Deno.test('Update an enrollee - incorrect active property type - error response', async () => {
    const badActiveTypeEnrollee = {...mockEnrollee} as any;
    badActiveTypeEnrollee.active = 'wrong type';

    await validateUpdateError(badActiveTypeEnrollee, 400, 'The active property must be of type boolean');
});

Deno.test('Update an enrollee - missing path id - error response', async () => {
    await validateUpdateError({...mockEnrollee}, 400, 'Please supply an enrollee id', '');
});

Deno.test('Update an enrollee - invalid id - error response', async () => {
    const invalidIdEnrollee = {...mockEnrollee} as any;
    invalidIdEnrollee.id = 'mock Id';

    await validateUpdateError({...mockEnrollee}, 500, 'Internal server error', invalidIdEnrollee.id);
});

Deno.test('Update an enrollee - no matching id - error response', async () => {
    const invalidIdEnrollee = {...mockEnrollee} as any;
    invalidIdEnrollee.id = nonMatchingEnrolleeId;

    await validateUpdateError({...mockEnrollee}, 404, undefined, invalidIdEnrollee.id);
});

Deno.test('Service is started on the default port', async () => {
    validateServiceStarted(8080);
});

Deno.test('Service is started on a custom port', async () => {
    validateServiceStarted(8585, 8585);
});

/**
 * Validates that the service is started
 * 
 * @param expectedPort the port on which the service is expected to be started
 * @param port the port on which to start the service
 */
async function validateServiceStarted(expectedPort: number, port: number = 8080) {
    const service: EnrolleeService = new EnrolleeService(port);
    const application: Application = service['application'];
    const listenStub: Stub<Application> = stub(application, 'listen', [
        new Promise<void>((resolve) => {
            resolve();
        })
    ]);

    const logStub: Stub<Console> = stub(console, 'log');

    await service.start();
    assertEquals(logStub.calls[0].args[0], Colors.blue(`Code challenge server running on port ${expectedPort}`));
    listenStub.restore();
    logStub.restore();
}

/**
 * Validates the error response when performing a get for a specific enrollee
 * 
 * @param id the enrollee id to be used in the context params
 * @param statusCode the expected status code
 * @param errorMessage the expected error message
 */
function validateGetError(id: string | undefined, statusCode: number, errorMessage: string | undefined) {
    const service: EnrolleeService = new EnrolleeService();
    const context: RouterContext = {
        params: {
            id: id
        } as any,
        response: {
        }
    }  as RouterContext;
    
    service.getEnrollee(context);
    assertEquals(context.response.status, statusCode);
    assertEquals(context.response.body, errorMessage);    
}

/**
 * Validates the error response when performing an update to an enrollee
 * 
 * @param enrollee the enrollee data
 * @param statusCode the expected status code
 * @param errorMessage the expected error message
 * @param id the enrollee id to be used in the context params
 */
async function validateUpdateError(enrollee: any, statusCode: number, errorMessage: string | undefined, id: string = enrolleeId) {
    const service: EnrolleeService = new EnrolleeService();
    const context: RouterContext = {
        params: {
            id: id
        } as any,
        request: {
            body: () => {
                return {
                    value: new Promise<any>((resolve) => {
                        resolve(enrollee);
                    })
                };
            }
        },
        response: {
        }
    }  as RouterContext;

    await service.updateEnrollee(context);
    assertEquals(context.response.status, statusCode);
    assertEquals(context.response.body, errorMessage);
}
