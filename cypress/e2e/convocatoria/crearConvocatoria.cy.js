
import { loginPage } from '../../main/auth/LoginPage';
import { navbarPage } from '../../main/menu/NavbarPage';
import { convocatoriaPage } from '../../main/convocatoria/convocatoriaCreate';


describe('Validaciones individuales de fechas en convocatoria', () => {
    beforeEach(() => {
        loginPage.visit();
        loginPage.fillCredentials(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
        loginPage.submit();
        cy.get('nav').should('be.visible');

        cy.wait(5000);
        navbarPage.clickCallsMenu();
        cy.url().should('include', '/convocatorias');
        convocatoriaPage.clickCrearConvocatoriaBtn();
        cy.get('form.modal-form').should('be.visible');
    });

    it('Debe mostrar error si inscripción empieza antes de hoy', () => {
        const data = {
            nombre: "Prueba error inscripción pasada",
            estado: "1",
            descripcion: "Inscripción antes de hoy",
            inscripcionInicio: "2023-05-26",
            inscripcionFin: "2025-07-05",
            pagoInicio: "2025-07-06",
            pagoFin: "2025-07-10",
            competenciaInicio: "2025-07-11",
            competenciaFin: "2025-07-15"
        };

        convocatoriaPage.llenarFormulario(data);
        cy.get('form')
            .contains('Debe ser igual o posterior a hoy.')
            .scrollIntoView()
            .should('be.visible');
    });

    it('Debe mostrar error si fin inscripción es antes que inicio', () => {
        const data = {
            nombre: "Fin antes de inicio",
            estado: "1",
            descripcion: "Inscripción mal ordenada",
            inscripcionInicio: "2025-07-05",
            inscripcionFin: "2025-07-01",
            pagoInicio: "2025-07-06",
            pagoFin: "2025-07-10",
            competenciaInicio: "2025-07-11",
            competenciaFin: "2025-07-15"
        };

        convocatoriaPage.llenarFormulario(data);
        cy.get('form')
            .contains('Debe ser después de la fecha de inicio.')
            .scrollIntoView()
            .should('be.visible');
    });

    it('Debe mostrar error si competencia empieza antes del fin de pago', () => {
        const data = {
            nombre: "Competencia antes del pago",
            estado: "1",
            descripcion: "Fechas cruzadas",
            inscripcionInicio: "2025-07-01",
            inscripcionFin: "2025-07-05",
            pagoInicio: "2025-07-06",
            pagoFin: "2025-07-10",
            competenciaInicio: "2025-07-09", // antes del fin de pago
            competenciaFin: "2025-07-15"
        };

        convocatoriaPage.llenarFormulario(data);
        cy.get('span.error-text').contains('Inicio de competencia debe ser después de pago.').should('be.visible');
    });

    it('Debe crear la convocatoria con datos correctos', () => {
        const data = {
            nombre: "Borrameeeeeeeee",
            estado: "1",
            descripcion: "Todo bien",
            inscripcionInicio: "2025-07-01",
            inscripcionFin: "2025-07-05",
            pagoInicio: "2025-07-06",
            pagoFin: "2025-07-10",
            competenciaInicio: "2025-07-11",
            competenciaFin: "2025-07-15"
        };

        convocatoriaPage.llenarFormulario(data);
        convocatoriaPage.enviarFormulario();
        convocatoriaPage.verificarExito();
    });
});
