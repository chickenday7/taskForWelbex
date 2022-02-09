import logo from './../../../logo.svg'


export const MainPage = () => {
  return(
      <div className='wrapperMain'>
          <img src={logo}/>
          <span className='wrapperMain__description'>В данном тестовом проекте было реализовано структура разделения трех уровней: UserInterface, BusinessLogicLayer, DataAccessLayer.
              Выполнены все пункты согласно ТЗ используя <strong>TypeScript</strong>. Были добавлены следующие библиотеки:
          </span>
          <ul>
              <li>Redux v 4.1.2 </li>
              <li>Redux-Thunk v2.4.1</li>
              <li>Axios v0.25</li>
              <li>React-Redux v7.2.6</li>
              <li>React-router-dom v6.2.1</li>
              <li>Node-sass</li>
          </ul>
      </div>
  )
}
