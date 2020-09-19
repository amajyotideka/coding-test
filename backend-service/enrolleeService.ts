import {
  Application,
  Router,
  RouterContext,
} from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { v4 as UUID } from 'https://deno.land/std/uuid/mod.ts';
import * as Colors from 'https://deno.land/std/fmt/colors.ts';

import { enrollees, IdentifiedEnrollee } from './enrollees.ts';

/**
 * An enrollee service that provides endpoints to get all enrollees, get a specific enrollee, and update an enrollee
 */
export class EnrolleeService {
  private router: Router;
  private application: Application;
  private port: number;

  constructor(port: number = 8080) {
    this.router = new Router();
    this.router.get('/enrollees', this.getEnrollees);
    this.router.get('/enrollees/:id', this.getEnrollee);
    this.router.put('/enrollees/:id', this.updateEnrollee);

    this.application = new Application();
    this.application.use(oakCors());
    this.application.use(this.router.routes());
    this.application.use(this.router.allowedMethods());

    this.port = port;
  }

  /**
   * Builds the response by setting the status and an optional response body
   *
   * @param context the router context containing the response object
   * @param status the status code of the response
   * @param body optional body to include in the response
   */
  private buildResponse = (
    context: RouterContext,
    status: number,
    body?: string | IdentifiedEnrollee | IdentifiedEnrollee[]
  ) => {
    context.response.status = status;
    context.response.body = body;
  };

  /**
   * Validates the given enrollee ID and if valid calls the supplied function, otherwise a response error is generated
   *
   * @param context the router context containing the response object
   * @param id the ID of the enrollee to validate
   * @param callback the function to call if the ID is valid
   */
  private validateId = (
    context: RouterContext,
    id: string | undefined,
    callback: (id: string) => void
  ) => {
    if (!id) {
      this.buildResponse(context, 400, 'Please supply an enrollee id');
    } else if (!UUID.validate(id)) {
      this.buildResponse(context, 500, 'Internal server error');
    } else if (!enrollees[id]) {
      this.buildResponse(context, 404);
    } else {
      callback(id);
    }
  };

  /**
   * Flattens the enrollee to include the enrollee ID
   *
   * @param id the ID of the enrollee
   */
  private flattenEnrollee = (id: string): IdentifiedEnrollee => ({
    id,
    ...enrollees[id],
  });

  /**
   * Gets a list of all the enrollees
   *
   * @param context the router context containing the response object
   */
  getEnrollees = (context: RouterContext) => {
    const enrolleeIds = Object.keys(enrollees);
    this.buildResponse(context, 200, enrolleeIds.map((id) => this.flattenEnrollee(id)));
  };

  /**
   * Gets the enrollee associated with the enrollee ID supplied in the context
   *
   * @param context the router context containing the response object
   */
  getEnrollee = (context: RouterContext) => {
    const id = context.params.id;

    this.validateId(context, id, (id: string) => {
      this.buildResponse(context, 200, this.flattenEnrollee(id));
    });
  };

  /**
   * Updates the enrollee associated with the enrollee ID supplied in the context
   *
   * @param context the router context containing the response object
   */
  updateEnrollee = async (context: RouterContext) => {
    const id = context.params.id;
    const rawBody = context.request.body();
    const body = await rawBody.value;

    if (!body) {
      this.buildResponse(context, 400, 'Please supply a body');
    } else if (body.hasOwnProperty('id') && body.id !== id) {
      this.buildResponse(context, 400, 'The id specified in the request body does not match the id in the path parameter');
    } else if (!body.hasOwnProperty('name')) {
      this.buildResponse(context, 400, 'Please supply an enrollee name');
    } else if (!body.hasOwnProperty('active')) {
      this.buildResponse(context, 400, 'Please supply a value for the active property');
    } else if (typeof body.active !== 'boolean') {
      this.buildResponse(context, 400, 'The active property must be of type boolean');
    } else {
      this.validateId(context, id, (id: string) => {
        enrollees[id] = body;
        body.id = id;
        this.buildResponse(context, 200, body);
      });
    }
  };

  /**
   * Starts the enrollee service
   */
  async start() {
    console.log(
      Colors.blue(`Code challenge server running on port ${this.port}`)
    );
    await this.application.listen({ port: this.port });
  }
}
