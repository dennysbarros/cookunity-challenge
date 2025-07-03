import goRestApi from '../fixtures/goRestApi.json';

describe('GoRest API - CRUD tests', () => {
  it('should find active users and validate details of first user', () => {
    cy.request(goRestApi.usersEndpoint).then((res) => {
      const activeUsers = res.body.data.filter((user) => user.status === 'active');
      const firstActiveUserId = activeUsers[0].id;

      cy.request(`${goRestApi.usersEndpoint}/${firstActiveUserId}`).then((userRes) => {
        expect(userRes.status).to.eq(200);
        expect(userRes.body.data.status).to.eq('active');
      });
    });
  });

  it('should update the first user name and validate the response', () => {
    const updatedName = 'Dennys Barros QA';
    const email = 'jana.waters@hotmail.us';

    cy.request(goRestApi.usersEndpoint).then((res) => {
      const firstUser = res.body.data[0];
      const userId = firstUser.id;

      cy.request({
        method: 'PATCH',
        url: `${goRestApi.usersEndpoint}/${userId}`,
        headers: { Authorization: `Bearer ${goRestApi.token}` },
        body: {
          name: updatedName,
          email,
          status: 'active',
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data.name).to.eq(updatedName);
      });
    });
  });
});
  
