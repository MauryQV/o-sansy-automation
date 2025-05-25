import { faker } from "@faker-js/faker";

export function randomFirstName() {
  return faker.person.firstName(25);
}

export function randomLastName() {
  return faker.person.lastName(25);
}

export function randomCiNumber() {
  return faker.string.numeric(8);
}

export function randomBirthDate() {
  return faker.date.birthdate({ min: 8, max: 19, mode: 'age' }).toISOString().split('T')[0];
}

export function randomEmailCompetitor() {
  return faker.internet.email().toLowerCase();
}

export function randomBirthDateInvalid() {
  const generateYoung = Math.random() < 0.5;

  if (generateYoung) {
    return faker.date.birthdate({ min: 0, max: 7, mode: 'age' }).toISOString().split('T')[0];
  } else {
    const age = faker.number.int({ min: 20, max: 100 });
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - age);
    return birthDate.toISOString().split('T')[0];
  }
}

export function randomRegionSelection() {
  const regionData = {
    'LA PAZ': {
      provinces: {
        'MURILLO': ['COLEGIO SAN CALIXTO', 'UNIDAD EDUCATIVA AYACUCHO'],
        'LOS ANDES': ['COLEGIO NACIONAL BATALLAS', 'UNIDAD EDUCATIVA LAJA'],
        'INGAVI': ['COLEGIO TIWANAKU']
      }
    },
    'COCHABAMBA': {
      provinces: {
        'CHAPARE': ['COLEGIO VILLA TUNARI'],
        'QUILLACOLLO': ['COLEGIO NACIONAL QUILLACOLLO', 'UNIDAD EDUCATIVA SAN PEDRO'],
        'CERCADO': ['COLEGIO LA SALLE', 'UNIDAD EDUCATIVA SAN AGUSTÍN', 'COLEGIO MARÍA AUXILIADORA']
      }
    }
  };
  const department = faker.helpers.arrayElement(Object.keys(regionData));
  cy.wait(2000);
  const provinces = Object.keys(regionData[department].provinces);
  const province = faker.helpers.arrayElement(provinces);
  cy.wait(2000);
  const schools = regionData[department].provinces[province];
  const school = faker.helpers.arrayElement(schools);

  return { department, province, school };
}


export function randomEmail() {
  return faker.internet.email();
}

export function randomPassword() {
  return faker.internet.password(12, true);
}

export function randomName() {
  return faker.person.fullName();
}

export function randomNameArea() {
  const areas = [
    "Matemática",
    "Física",
    "Química",
    "Biología",
    "Informática",
    "Astronomía",
    "Geografía",
    "Historia",
    "Literatura",
    "Arte",
    "Educación Cívica",
    "Filosofía",
    "Economía",
  ];
  return (
    faker.helpers.arrayElement(areas) +
    " " +
    faker.word.adjective({ length: { min: 3, max: 8 } })
  );
}

export function randomAreaDescription() {
  let description = "";
  let tries = 0;
  while ((description.length < 10 || description.length > 100) && tries < 10) {
    description = faker.lorem.sentence();
    if (description.length > 100) {
      description = description.slice(0, 100);
    }
    tries++;
  }
  if (description.length > 100) {
    description = description.slice(0, 100);
  }
  return description;
}

export function randomAreaCost() {
  return faker.number.int({ min: 15, max: 30 }).toString();
}

export function randomCategory() {
  const animalKeys = Object.keys(faker.animal);
  const key = animalKeys[Math.floor(Math.random() * animalKeys.length)];
  const animalType = faker.animal[key]();
  const label = `Cat ${animalType}`;
  return label.length > 30 ? label.slice(0, 30) : label;
}
