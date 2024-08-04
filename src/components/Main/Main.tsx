import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@material-ui/core"
import useStyles from "./styles"
import Form from "./Form/Form";
import List from "./List/List";
import { useTransactions } from "../../hooks/useTransactions";
// import Dictaphone from "../Dictaphone";

const Main = () => {
    const classes = useStyles();

    const { total: incomeTotal } = useTransactions('Income');
    const { total: expenseTotal } = useTransactions('Expense');

  return (
    <Card>
        <CardHeader title='Expense Tracker' subheader='Powered by Speechly' />

        <CardContent>
            <Typography align="center" variant="h5">
                Total balance ${incomeTotal - expenseTotal}
            </Typography>

            <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>

            </Typography>

            <Divider />

            <Form />
        </CardContent>

        <CardContent className={classes.cartContent}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List />
                </Grid>
            </Grid>
        </CardContent>

        {/* <Dictaphone /> */}
    </Card>
  )
}

export default Main
