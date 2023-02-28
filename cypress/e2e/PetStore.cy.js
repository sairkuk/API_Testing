import { faker } from '@faker-js/faker';
import * as pet from '../fixtures/pet.json'

pet.id = parseInt(faker.random.numeric(5));
pet.name = faker.animal.crocodilia.name;
pet.category.id = parseInt(faker.random.numeric(3));
pet.category.name = faker.animal.type();
pet.status = 'available';

//let petId 
describe('Pet suite', () => {

  it('Pet creation', () => {
    cy.log('Create pet');
    cy.request('POST', '/pet', pet).then( response => {
      console.log(response.allRequestResponses);

      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
    //   cy.log(`Request headers:  ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
    //   cy.log(`Request Url:  ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);

    expect(response.status).to.be.equal(200)
    expect(response.statusText).to.be.equal('OK')
    expect(response.isOkStatusCode).to.be.true;
   // expect(response.body.id).to.be.equal(pet.id);
    expect(response.body.name).to.be.equal(pet.name);
    expect(response.body.category.id).to.be.equal(pet.category.id);
    expect(response.body.category.name).to.be.equal(pet.category.name);
    //petId = response.body.id;
    })
  })

  it('Get pet', () => {
    cy.log('Get pet');
    cy.request('GET', `/pet/${pet.id}`).then( response => {
      console.log(response.allRequestResponses);

      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
    //   cy.log(`Request headers:  ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
    //   cy.log(`Request Url:  ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);

    expect(response.status).to.be.equal(200)
    expect(response.statusText).to.be.equal('OK')
    expect(response.isOkStatusCode).to.be.true;
    expect(response.body.id).to.be.equal(pet.id);
    expect(response.body.name).to.be.equal(pet.name);
    expect(response.body.category.id).to.be.equal(pet.category.id);
    expect(response.body.category.name).to.be.equal(pet.category.name);
    })
  })
  it('Update pet with id', () => {
    cy.log('Update pet with id');
    cy.request('PUT', `/pet`, pet).then( response => {
      console.log(response.allRequestResponses);

    cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);

    expect(response.status).to.be.equal(200)
    expect(response.statusText).to.be.equal('OK')
    expect(response.isOkStatusCode).to.be.true;
    expect(response.body.id).to.be.equal(pet.id);
    expect(response.body.name).to.be.equal(pet.name);
    expect(response.body.category.id).to.be.equal(pet.category.id);
    expect(response.body.category.name).to.be.equal(pet.category.name);
    }), 

    cy.request('GET', `/pet/${pet.id}`).then( response => {
      console.log(response.allRequestResponses);

      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
    expect(response.status).to.be.equal(200)
    expect(response.statusText).to.be.equal('OK')
    expect(response.isOkStatusCode).to.be.true;
    expect(response.body.id).to.be.equal(pet.id);
    expect(response.body.name).to.be.equal(pet.name);
    expect(response.body.category.id).to.be.equal(pet.category.id);
    expect(response.body.category.name).to.be.equal(pet.category.name);
    })


  })

  it('Find pet by status', () => {
    cy.log('GET pet');
    cy.request('GET', `/pet/findByStatus?status=${pet.status}` ).then( response => {
      console.log(response.allRequestResponses);

    cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);

    expect(response.status).to.be.equal(200)
    expect(response.statusText).to.be.equal('OK')
    expect(response.isOkStatusCode).to.be.true;
    
    const itemPet = response.body.find((item)=>{
      return(item.id == pet.id)
    })
    expect(itemPet.id).to.be.equal(pet.id);
    expect(itemPet.name).to.be.equal(pet.name);
    expect(itemPet.category.id).to.be.equal(pet.category.id);
    expect(itemPet.category.name).to.be.equal(pet.category.name);
    })
  })


  it('Update pet with id ${pet.id} using form data', () => {
    cy.log('Update pet with id ${pet.id} using form data');
    cy.request({
      url: `/pet/${pet.id}`,
      method: 'POST',
      form: true,
     }).then( response => {
      console.log(response.allRequestResponses);
      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
   
    expect(response.status).to.be.equal(200)
    expect(response.statusText).to.be.equal('OK')
    expect(response.isOkStatusCode).to.be.true;
    expect(response.body.message).to.be.equal(pet.id.toString());
    
    cy.request({
      url: `/pet/${pet.id}`,
      method: 'GET',
      failOnStatusCode: false,
     }).then( response => {
    expect(response.body.name).to.be.equal(pet.name);
    expect(response.body.category.id).to.be.equal(pet.category.id);
    expect(response.body.category.name).to.be.equal(pet.category.name);
     })
    })
  })

  it('Delete pet with id ${pet.id', () => {
    cy.log('Delete pet with id ${pet.id');
    cy.request('DELETE', `/pet/${pet.id}`).then(response2 => {
      console.log(response2.allRequestResponses);

      cy.log(`Request body: ${response2.allRequestResponses[0]["Request Body"]}`);
    

    expect(response2.status).to.be.equal(200)
    expect(response2.statusText).to.be.equal('OK')
    expect(response2.isOkStatusCode).to.be.true;

   cy.request({
    url: `/pet/${pet.id}`,
    method: 'GET',
    failOnStatusCode: false,
   }).then( response => {
      expect(response.body.type).to.be.equal('error');
      expect(response.body.message).to.be.equal('Pet not found');
   
    })
    })


})
})
