import authApi from "../api/AuthApi";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../stores/AuthStore";

export default function Login(){

  const {login} = useAuthStore();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function loginHandler(ev){
    ev.preventDefault()
    try{
      const response = await authApi.loginApi(username, password);
      const decoded = jwtDecode(response.data.accessToken);
      login(decoded, response.data.accessToken)
      navigate("/")
    }catch (e){
      alert('아이디나 비밀번호가 틀렸습니다.')
    }
  }

  return (
      <>
        <form className="col s12" method="post" id="signupForm" onSubmit={loginHandler}>
          <div className="row">
            <div className="input-field col s7 ">
              <i className="material-icons prefix">account_circle</i>
              <input type="text" placeholder="userId" onChange={e => setUsername(e.target.value)}
                     name="username" className="validate"/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s7 ">
              <i className="material-icons prefix">account_circle</i>
              <input type="password" onChange={e => setPassword(e.target.value)}
                     placeholder="password" className="validate" name="password"/>
              <span className="helper-text"></span>
            </div>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light offset-s1 col-6"
                    type="submit" name="action">
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>

      </>

  )
}