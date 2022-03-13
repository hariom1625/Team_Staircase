import logo from './logo.svg';
import './App.css';

function Login(props) {
  return (
    <div className="login" style={{paddingTop:"100px"}}>
      <main class="form-signin" style={{margin:"auto",width:"30vw",padding:"50px 30px",borderRadius:"10px",color:"white"}}>
  <form>
    {/* <img class="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"></img> */}
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating" style={{color:"black"}}>
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating" style={{marginTop:"20px",color:"black"}}>
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3" style={{marginTop:"20px"}}>
      <label>
        <input type="checkbox" value="remember-me"></input> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={() => props.setLogged(true)}>Sign in</button>
    <p class="mt-5 mb-3" style={{color:"white"}}>&copy; 2022–2023</p>
  </form>
</main>
    
    </div>
  );
}

export default Login;
