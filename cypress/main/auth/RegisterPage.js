class RegisterPage{
    nameInput = 'input#firstName';
    lastnameInput = 'input#lastName';
    ciInput = 'input#idNumber';
    dateInput = 'input#birthDate';
    correoInput = 'input#email';
    departmentSelect = 'select#department';
    provinceSelect = 'select#province';
    schoolSelect = 'select#school';
    registerButton = 'button.registro-btn';

    visit() {
        cy.visit("/registro");
    }

    buttonCompetitor(){
        cy.get('div.registro-toggle :nth-child(1)').click();
    }

    fillform(name, lastname, ci, date, correo, department, province, school){
        cy.get(this.nameInput).clear().type(name);
        cy.get(this.lastnameInput).clear().type(lastname);
        cy.get(this.ciInput).clear().type(ci);
        cy.get(this.dateInput).clear().type(date);
        cy.get(this.correoInput).clear().type(correo);
    }

    selectRegion(department, province, school) {
        cy.get(this.departmentSelect).select(department);
        cy.get(this.provinceSelect).should('not.be.disabled').select(province);
        cy.get(this.schoolSelect).should('not.be.disabled').select(school);
    }


    buttonRegister(){
        cy.get(this.registerButton).click();
    }
}

export const registerPage = new RegisterPage();