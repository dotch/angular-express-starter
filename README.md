# Essential MEAN starter kit

Work in progress, far from being ready.

## Decisions made for you

- [x] Mongo DB as database
- [x] Express as MVC Framework
- [x] JWT-Simple for Authentication
- [ ] Nodemailer for Email verification and lost password
- [x] Angular 1.x as MVC Framework
- [ ] new angular component router for routing
- [x] Satellizer for authentication
- [x] Angular Material for Layout and UI components


TODO:

# Authentication Flow

* E-Mail is the Basis for authentication. E-Mails have to be unique.
* Signup with FB / Google should not create a new Account when the email is already used. It should also not automatically link the accounts. It should prompt the user to sign-in.
* Unlinking your only authentication method should not be possible.
* adding a password to a FB / Google created account should be possible.
* profile changes should require the old password, except when the account has been created with fb / google and does not have a password.
