import useAuthStore from "../../stores/AuthStore";
import AuthApi from "../../api/AuthApi";
import {useNavigate} from "react-router-dom";

export default function Header(){

  const {isLoggedIn, logout} = useAuthStore()
  const logoutApi = AuthApi.logoutApi
  const navigate = useNavigate()

  const handlerLogout = async (ev) => {
    ev.preventDefault();
    logout()
    try{
      await logoutApi()
      navigate('/')
    }catch (e){
      alert("서버에러입니다.")
    }
  }

  return (
      <header className="header">
        <nav className="navbar white">
          <div className="nav-wrapper ">
            <a href="/" className="brand-logo grey-text">Grepp</a>
            {
              isLoggedIn ? (<ul id="nav-mobile"
                                className="right hide-on-med-and-down grey-text">
                    <li><a href="/member/mypage" className="grey-text">mypage</a>
                    </li>
                    <li><a href="#" className="grey-text" onClick={handlerLogout}>logout</a>
                    </li>
                    <li>
                      <a href="mobile.html">
                        <i className="material-icons grey-text sidenav-trigger"
                           data-target="slide-out">more_vert</i>
                      </a>
                    </li>
                  </ul>)
                  : (<ul id="nav-mobile"
                         className="right hide-on-med-and-down grey-text">
                    <li><a href="/login" className="grey-text">sign in</a>
                    </li>
                    <li><a href="/member/signup" className="grey-text">sign up</a>
                    </li>
                    <li>
                      <a href="mobile.html">
                        <i className="material-icons grey-text sidenav-trigger"
                           data-target="slide-out">more_vert</i>
                      </a>
                    </li>
                  </ul>)
            }
          </div>
        </nav>
      </header>
  )

}