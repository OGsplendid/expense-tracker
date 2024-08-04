import useStyles from './styles'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, List as MUIList, Slide } from '@material-ui/core'
import { Delete, MoneyOff } from '@material-ui/icons'
import { ExpenseTrackerContext } from '../../../context/context';
import { useContext } from 'react';

const List = () => {
    const classes = useStyles();
    const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  return (
    <MUIList dense={false} className={classes.list}>
        {transactions.map((tr) => (
            <Slide direction='down' in mountOnEnter unmountOnExit key={tr.id}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={tr.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                            <MoneyOff />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={tr.category} secondary={`$${tr.amount} - ${tr.date}`} />

                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='delete' onClick={() => deleteTransaction(tr.id)}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </Slide>
        ))}
    </MUIList>
  )
}

export default List
