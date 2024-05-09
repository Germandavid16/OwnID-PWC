# Documentation OwnId


## Work Logic
We're working with the package @ownid/react, where we have a login form, and we call the component from the library <OwnID />.

When logging in through this component, the onLogin function is called. OwnID will interact with your backend through routes like /setOwnIDDataByLoginId, /getOwnIDDataByLoginId, /getSessionByLoginId.
```js
 <OwnID type={WidgetType.Login}
        passwordField={passwordField}
        loginIdField={emailField}
        onError={(error) => console.error(error)}
        onLogin={onLogin} />

function onLogin(data: {token: string}) {
  // we get from server
  localStorage.setItem('sessionID', JSON.stringify({ token: data.token }));
  navigate(ROUTES.account)
}
```
First, OwnID makes a request to this route, where we can write any login logic. Here's an example:

```js
    router.post('/getSessionByLoginId', async (req, res) => {
        const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where: {email: email}});
        if (!user) { return res.json({ errorCode: 404 }) } //Error code when user doesn't exist
        const jwt = sign({ email: user.email }, 'secret');
        return res.json({ token: jwt });
    });

```
Once you've written the logic for the routes and everything is ready, you'll need to create an application on the website https://console.ownid.com/home, where you'll specify the domain of your server to which OwnID will communicate.

![img.png](https://github.com/Germandavid16/OwnID-PWC/blob/main/OwnId_Frontend/img.png)
After creating the application, we specify the AppId in the configuration.
```js
<OwnIDInit
  config={{ appId: 'your appId' }}
/>
```
During user registration on the backend, you need to create a route where we will save the user, making sure not to forget to record the ownIdData field that OwnID will pass to us. With this field, OwnID will understand that the user is created and will not request a password.


On the registration screen, we call the component just like in the login <OwnID >, where we specify type={WidgetType.Register}. We pass two functions there, onLogin and onRegister. In the onLogin function, you need to insert the same logic as on the login page, and in onRegister, we insert a route for user registration in our system - /users/signup. On the backend, we implement our own logic.

```js
<OwnID type={WidgetType.Register}
       loginIdField={emailField}
       passwordField={passwordField}
       onError={(error) => console.error(error)}
       onLogin={onLogin}
       onRegister={onRegister} />


// onRegister function example
async function onRegister(ownIdData:any) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const body = JSON.stringify({
    email: ownIdData.loginId,
    ownIdData: ownIdData.data
  });
  try {
    await fetch('/users/signup', {
      method: 'POST',
      headers: myHeaders,
      body,
    })
    localStorage.setItem('sessionID', JSON.stringify({ token: 'token' }));
    navigate(ROUTES.account)
  } catch (e) {
    console.log("=>(Register.tsx:23) e", e);
  }
}
```





















