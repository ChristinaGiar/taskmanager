import classes from './VerificationModal.module.css'

export const VerificationModal = ({ email }) => {
  return (
    <div>
      <div className={classes.image}>
        <i
          className={`${classes.icon} fa-solid fa-paper-plane`}
          style={{ color: 'white' }}
        ></i>
      </div>
      <h3 className={classes.title}> Verify your email</h3>
      <p className={classes.text}>
        We have sent an email to <span className={classes.email}>{email}</span>{' '}
        to verify your address and activate your account. If not found, please
        check also the spam folder.
      </p>
    </div>
  )
}
