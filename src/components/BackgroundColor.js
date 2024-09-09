import { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import AuthContext from '../store/auth-context'
import { themeColors } from '../data/index'

const BackgroundColor = () => {
  const crx = useContext(AuthContext)

  const changeBgColorHandler = (color) => {
    crx.themeColorHandler(color)
  }

  return (
    <>
      <style>{`body { background-color: ${crx?.themeColor?.code}; }`}</style>
      <div className='color-dropdown'>
        <Dropdown>
          <Dropdown.Toggle id='color-dropdown'>
            <i
              className='fa-solid fa-droplet'
              style={{ color: `${crx?.themeColor?.code}` }}
            ></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className='title-dropdown'> Change color</div>
            <div className='color-dropdown-items'>
              {themeColors.map((color, idx) => {
                return (
                  <Dropdown.Item
                    key={idx}
                    value={color.code}
                    className={`color-box ${
                      crx?.themeColor?.code === color.code ? 'active' : ''
                    } `}
                    style={{ backgroundColor: `${color.code}` }}
                    onClick={() => changeBgColorHandler(color)}
                  ></Dropdown.Item>
                )
              })}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}

export default BackgroundColor
