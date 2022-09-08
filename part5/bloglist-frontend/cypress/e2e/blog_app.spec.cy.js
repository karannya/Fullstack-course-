describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'testAnnya',
      password: 'password123',
      name: 'Annya',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testAnnya')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()
      cy.contains('Annya logged in')
    })

    it('fails with wrong credentials', function() {
      //cy.contains('login').click()
      cy.get('#username').type('password123')
      cy.get('#password').type('pass123')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Annya logged in')
    })
    //})
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testAnnya', password: 'password123' })
    })


    it('A blog can be created', function() {

      cy.contains('create new blog').click()
      cy.get('#title').type('Hello World')
      cy.get('#author').type('Annya Kar')
      cy.get('#url').type('www.testit.com')
      /* cy.contains('create').click()
      cy.createBlog({
        title: 'Hello world test',
        author: 'Annya Kar',
        url: 'www.testit.com'
      }) */
      cy.get('#create-button').click()

    })
    it('it is possible to add a like to a blog', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Hello World')
      cy.get('#author').type('Annya Kar')
      cy.get('#url').type('www.testit.com')
      cy.get('#create-button').click()

      cy.contains('Annya Kar')
      cy.contains('view').click()
      cy.contains('0')
      cy.get('#like-btn').click()
      cy.contains('1')
    })
    it('it is possible to remove the blog by user who created it', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Hello World')
      cy.get('#author').type('Annya Kar')
      cy.get('#url').type('www.testit.com')
      cy.get('#create-button').click()

      cy.contains('Annya Kar')
      cy.contains('view').click()
      cy.get('#remove-btn').click()
      cy.get('html').should('not.contain', 'Hello World')
    })
  })
})