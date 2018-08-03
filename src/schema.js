import { gql } from 'apollo-server-express'

require('dotenv').config()

const doctors = [
  { id: 1, name: 'Jason', lastName: 'Foo' },
  { id: 2, name: 'Bar', lastName: 'Bar' },
]

const patients = [
  { id: 1, name: 'Leire', lastName: 'Polo', doctor: 2 },
  { id: 2, name: 'Alice', lastName: 'Mao', doctor: 1 },
  { id: 3, name: 'Alvaro', lastName: 'Pinot', doctor: 1 },
]

const typeDefs = gql`
  type Query {
    doctor(id: Int, name: String): Doctor
    doctors: [Doctor]
    patients: [Patient]
  }

  type Mutation {
    setPatient(name: String, lastName: String, id: Int, doctor: Int): Patient
  }

  type Doctor {
    id: Int
    name: String
    lastName: String
    patients(name: String): [Patient]
  }

  type PatientInput {
    name: String
    lastName: String
  }
  type Patient {
    id: Int
    name: String
    lastName: String
    doctor: Int
  }
`

const resolvers = {
  Query: {
    doctors: () => doctors,
    doctor: (root, { id }, context) =>
      doctors.filter(doctor => doctor.id == id)[0],
    patients: () => patients,
  },
  Mutation: {
    setPatient: (root, { name, lastName, id, doctor }) => {
      patients.push({ name, lastName, id, doctor })
      console.log('Patients: ', patients)
      return patients.filter(patient => patient.id == id)[0]
    },
  },
  Doctor: {
    patients: (root, args, context, info) => {
      console.log('Root:', root)
      const doctorId = doctors.filter(doctor => doctor.name == root.name)[0].id
      return patients.filter(patient => patient.doctor == doctorId)
    },
  },
}

export default {
  typeDefs,
  resolvers,
}
