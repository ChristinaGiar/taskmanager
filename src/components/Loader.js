import classes from './Loader.module.css'

const Loader = ({ loaderSize }) => (
  <div
    className={`${classes.loader} ${loaderSize && classes[loaderSize]} `}
  ></div>
)

export default Loader
