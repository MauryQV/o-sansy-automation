import {registerPage} from '../../main/auth/RegisterPage'
import { randomBirthDate, randomBirthDateInvalid, randomFirstName, randomCiNumber, randomLastName, randomRegionSelection, randomEmailCompetitor } from "../../utils/data-generator";

describe("Register Page Tests", () => {
  beforeEach(() => {
    registerPage.visit();
    registerPage.buttonCompetitor();
  });

  it("Debe mostrar error con la fecha de nacimiento inválida", () => {
    const name = randomFirstName();
    const lastName = randomLastName();
    const ci = randomCiNumber();
    const birthdate = randomBirthDateInvalid();
    const email = randomEmailCompetitor();
    const { department, province, school } = randomRegionSelection();

    registerPage.fillform(name, lastName, ci, birthdate, email);

    registerPage.selectRegion(department, province, school);

    registerPage.buttonRegister();

    cy.get('input#birthDate').should("have.class", "error");

    cy.wait(5000);
  });

  it("Debe mostrar error si los campos están vacíos", () => {
    registerPage.buttonRegister();

    cy.contains("Debe ingresar su nombre.").should("be.visible");
    cy.contains("Debe ingresar su apellido.").should("be.visible");
    cy.contains("Número de carnet inválido.").should("be.visible");
    cy.contains("Debe seleccionar su fecha de nacimiento.").should("be.visible");
    cy.contains("Correo inválido.").should("be.visible");
    cy.contains("Debe seleccionar su departamento.").should("be.visible");
    cy.contains("Debe seleccionar su provincia.").should("be.visible");
    cy.contains("Debe seleccionar su centro educativo.").should("be.visible");

    cy.wait(3000);
  });

  it("Debe permitir registrar un competidor con datos válidos", () => {
    const name = randomFirstName();
    const lastName = randomLastName();
    const ci = randomCiNumber();
    const birthdate = randomBirthDate();
    const email = randomEmailCompetitor();
    const { department, province, school } = randomRegionSelection();

    registerPage.fillform(name, lastName, ci, birthdate, email);

    registerPage.selectRegion(department, province, school);

    registerPage.buttonRegister();

    cy.wait(1000);
  });
});