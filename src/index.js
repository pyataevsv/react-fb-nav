import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './reset.css'
import { ReactComponent as PlusIcon } from './icons/plus.svg'
import { ReactComponent as BellIcon } from './icons/bell.svg'
import { ReactComponent as MessengerIcon } from './icons/messenger.svg'
import { ReactComponent as BoltIcon } from './icons/bolt.svg'
import { ReactComponent as CaretIcon } from './icons/caret.svg'
import { ReactComponent as ChevronIcon } from './icons/chevron.svg'
import { CSSTransition } from 'react-transition-group';


function Navbar(props) {

  return (
    <nav className='nav-bar'>
      <div className='nav-right'>
        {props.children}
      </div>
    </nav>
  )
}

function Navitem(props) {

  const [ddOpened, setDdOpened] = useState(false)

  return (
    <div className='nav-item'>
      <div className='btn-iconed' onClick={() => setDdOpened(!ddOpened)}>
        <div>
          {props.content}
        </div>
      </div>
      {ddOpened && <Dropdown closeDd={setDdOpened} />}
    </div>
  )
}


function Dropdown(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setHeight] = useState(null);
  const ddRef = useRef(null)

  function calcHeight(el) {
    setHeight(el.offsetHeight)
  }

  useEffect(() => {
    if (ddRef) {
      document.addEventListener('click', listener)
    }
    function listener(e) {
      if (!ddRef.current.contains(e.target)) {
        props.closeDd(false)
      }
    }
    return () => {
      document.removeEventListener('click', listener)
    }

  })

  function Dropitem(props) {

    return (
      <div className='drop-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <div className='btn-iconed'>
          <div>
            {props.leftIcon}
          </div>
        </div>
        <div>{props.children}</div>
        <div>{props.rightIcon}</div>
      </div>
    )
  }

  return (
    <div ref={ddRef} className='dropdown' style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames='menu-prime'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <Dropitem >My profile</Dropitem>
          <Dropitem goToMenu='animales' leftIcon={<>🦁</>} rightIcon={<ChevronIcon />}>Animals</Dropitem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animales'}
        timeout={500}
        classNames='menu-second'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <Dropitem goToMenu='main' leftIcon={<>🦊</>} rightIcon={<ChevronIcon />}></Dropitem>
          <Dropitem goToMenu='main' leftIcon={<>🐺</>} rightIcon={<ChevronIcon />}></Dropitem>
          <Dropitem goToMenu='main' leftIcon={<>🐵</>} rightIcon={<ChevronIcon />}></Dropitem>
          <Dropitem goToMenu='main' leftIcon={<>🐴</>} rightIcon={<ChevronIcon />}></Dropitem>
          <Dropitem goToMenu='main' leftIcon={<>🦁</>} rightIcon={<ChevronIcon />}></Dropitem>
          <Dropitem goToMenu='main' leftIcon={<>🕷</>} rightIcon={<ChevronIcon />}></Dropitem>
          <Dropitem goToMenu='main' leftIcon={<>🐵</>} rightIcon={<ChevronIcon />}></Dropitem>

        </div>
      </CSSTransition>

    </div>

  )
}




const App = () => {
  return (
    <Navbar>
      <Navitem content={<PlusIcon />} />
      <Navitem content={<BellIcon />} />
      <Navitem content={<MessengerIcon />} />
      <Navitem content={<BoltIcon />} />
      <Navitem content={<CaretIcon />} />
    </Navbar>
  )
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)
