export default function Sidebar() {
  return (
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="#" alt="flower"/>
            </div>
            <a href="#"><img className="circle" alt="flower"
                                 src="#"/></a>
            <a href="#"><span className="white-text name">John Doe</span></a>
            <a href="#"><span
                className="white-text email">jdandturk@gmail.com</span></a>
          </div>
        </li>
        <li><a href="#"><i className="material-icons">cloud</i>First Link With Icon</a>
        </li>
        <li><a href="#">Second Link</a></li>
        <li>
          <div className="divider"></div>
        </li>
        <li><a className="subheader">Subheader</a></li>
        <li><a className="waves-effect" href="#">Third Link With Waves</a></li>
      </ul>
)
}