import { incomeCategories, expenseCategories } from '../../../constants/categories'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import useStyles from './styles'
import { ChangeEvent, useState, useContext } from 'react'
import { ExpenseTrackerContext, ITransaction } from '../../../context/context'
import { nanoid } from 'nanoid';
import { format } from 'date-fns'
import { IIncomeCategorie } from '../../../constants/categories'

const initialState = {
    id: '',
    type: 'Income',
    category: '',
    amount: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
}

const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState<ITransaction>(initialState);

    const { addTransaction } = useContext(ExpenseTrackerContext);

    const selectedCatigory: IIncomeCategorie[] = formData.type === 'Income' ? incomeCategories : expenseCategories;

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const { name, value } = e.target;
        if (!name) return;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCreateClick = () => {
        if (!formData.amount) return;
        const transaction = {
            ...formData,
            amount: Number(formData.amount),
            id: nanoid(),
        }
        addTransaction(transaction);
        setFormData(initialState);
    }

  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography align='center' variant='subtitle2' gutterBottom>
                ...
            </Typography>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select name='type' value={formData?.type} onChange={handleFormData}>
                    <MenuItem value='Income'>Income</MenuItem>
                    <MenuItem value='Expense'>Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select name='category' value={formData?.category} onChange={handleFormData}>
                    {selectedCatigory.map((cat) => (
                        <MenuItem key={cat.type} value={cat.type}>{cat.type}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <TextField name='amount' value={formData?.amount} type='number' label='Amount' fullWidth onChange={handleFormData} />
        </Grid>

        <Grid item xs={6}>
            <TextField name='date' value={formData?.date} type='date' label='Date' fullWidth onChange={handleFormData} />
        </Grid>

        <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={handleCreateClick}>
            Create
        </Button>
    </Grid>
  )
}

export default Form

// @ts-nocheck