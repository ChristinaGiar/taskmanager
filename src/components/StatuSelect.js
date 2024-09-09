import { useState } from 'react'
import classes from './TitleModal.module.css'
import { emojis } from '../data'

export const StatuSelect = ({ icon, iconChange }) => {
  const [iconSelect, setIconSelect] = useState(false)

  return (
    <div className={classes.modalStatusWrapper}>
      <div
        className={`${classes.modalStatus} ${
          !iconSelect && classes.selectClosed
        }`}
        onClick={() => {
          setIconSelect(!iconSelect)
        }}
      >
        {icon}
      </div>
      {iconSelect && (
        <div
          className={classes.select}
          tabIndex={0}
          onBlur={() => setIconSelect(false)}
        >
          {emojis.map((emoji, index) => (
            <div
              key={emoji}
              className={`${emoji === icon ? classes.active : ''} ${
                classes.selectIcon
              }`}
              onClick={() => {
                iconChange(emoji)
                setIconSelect(false)
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
