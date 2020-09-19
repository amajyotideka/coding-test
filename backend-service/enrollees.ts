export type Enrollee = {
  active: boolean;
  name: string;
  dateOfBirth?: string;
};

export type IdentifiedEnrollee = { id: string } & Enrollee;

export type MappedEnrollee = {
  [id: string]: Enrollee;
};

export const enrollees: MappedEnrollee = {
  '36653835-fbe0-4c42-a93c-3e561823934f': {
    active: true,
    name: 'Gabe Newell',
    dateOfBirth: '1962-11-3',
  },
  'ed9f9e35-9767-4586-a19b-903661aa859d': {
    active: true,
    name: 'Todd Howard',
    dateOfBirth: '1971-04-25',
  },
  'e8637db3-3549-43ee-8e20-45b8fcb5a370': {
    active: false,
    name: 'Reggie Fils-Aime',
    dateOfBirth: '1961-03-25',
  },
  '8b8b9cf0-652e-4b82-a7ca-e9ed47e69be4': {
    active: false,
    name: 'Hideki Kamiya',
  },
  'f445416d-82c2-4acd-b371-35567d5fd757': {
    active: true,
    name: 'Cliffy B',
    dateOfBirth: '1975-02-12',
  },
  '994cd525-be92-4664-97c9-cb110772383f': {
    active: true,
    name: 'Doug Bowser',
    dateOfBirth: '1965-08-28',
  },
  '2af2cd35-e3bc-47c2-9591-1edb0c1a0c90': {
    active: true,
    name: 'Shigeru Miyamoto',
    dateOfBirth: '1952-11-16',
  },
  '4c5cca1c-18cd-4216-b4b5-4524d1bd135e': {
    active: false,
    name: 'Chris Sawyer',
    dateOfBirth: '1961-01-01',
  },
  '2caf7c60-98bd-4592-971f-acbfd32dbafa': {
    active: true,
    name: 'Mabel Addis',
    dateOfBirth: '1912-05-21',
  },
  '0b0c9adc-f148-42ab-a8bf-3183da4bb879': {
    active: true,
    name: 'Peter Molyneux',
    dateOfBirth: '1959-05-05',
  },
  '65f43b1d-6790-409f-a5b3-fd7d69fa36a6': {
    active: false,
    name: 'Will Wright',
    dateOfBirth: '1960-01-20',
  },
  'c478a933-37e0-4502-aafa-67e3fb7b7284': {
    active: true,
    name: 'Kim Swift',
    dateOfBirth: '1983-01-01',
  },
  '8e85cb7a-7f29-4cb7-9314-7e722e580205': {
    active: true,
    name: 'Gunpei Yokoi',
    dateOfBirth: '1941-09-10',
  },
  'bd804bcd-8123-4dee-b21b-a71fcffd7533': {
    active: false,
    name: 'Masahiro Sakurai',
    dateOfBirth: '1970-08-03',
  },
  'ee6d3cab-e875-4220-9a5c-17c7c14353a2': {
    active: false,
    name: 'Roberta Williams',
    dateOfBirth: '1953-02-16',
  },
  '89a0cd05-25fb-4b6e-a8f8-fc2187f690d0': {
    active: true,
    name: 'Rand Miller',
    dateOfBirth: '1959-01-17',
  },
  'fe1636a3-4d23-4068-ba56-551fae06e29c': {
    active: true,
    name: 'Jordan Mechner',
    dateOfBirth: '1964-06-04',
  },
  '90ba3d4b-e3bb-435e-92c1-094534d00c94': {
    active: true,
    name: 'Dona Bailey',
    dateOfBirth: '1956-01-01',
  },
  'd9bdeab0-735a-4742-9c46-cc4d5db37e0c': {
    active: true,
    name: 'William Crowther',
    dateOfBirth: '1936-01-01',
  },
  'a06be89b-78de-459b-a9b7-6f57319fec99': {
    active: false,
    name: 'Ogden Morrow',
  },
  '45ebed1c-3782-4153-8ce1-83a0fda2b5d6': {
    active: true,
    name: 'James Halliday',
    dateOfBirth: '1972-09-23',
  },
};
