import Details from "./components/details/Details"
import { Grid } from "@material-ui/core"
import useStyles from './styles'
import Main from "./components/Main/Main";

function App() {
  const classes = useStyles();

  return (
    <div>
      <Grid 
        className={classes.grid}
        container 
        spacing={0} 
        alignItems="center" 
        justifyContent="center" 
        style={{ height: '100vh' }}
      >
        <Grid item sm={12} md={3}>
          <Details title="Income" />
        </Grid>

        <Grid item sm={12} md={3}>
          <Main />
        </Grid>

        <Grid item sm={12} md={3}>
          <Details title="Expense" />
        </Grid>

      </Grid>
    </div>
  )
}

export default App
