import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { formatter } from '../utils/formatter';

const useStyles = makeStyles((theme) => ({
    tableContainer:
    {
        maxHeight: 370
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),

    },
    table: {
        minWidth: 750,

    },
    tableBody:
    {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.dark,
        },

    },
    checkBox:
    {
        color: '#97A1A9',
    },

    mainCheckBox: {
        padding: '0px 10px',
        color: '#97A1A9',
        margin: '0'
    },

    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function RenderViewTable (props)
{
  const classes = useStyles()

    return (
        <TableContainer className={classes.tableContainer}>
            <Table
                className={classes.table} >
                <TableHead >
                    <TableRow >
                        <TableCell>
                        </TableCell>
                        <TableCell>Invoice Number</TableCell>
                        <TableCell align="right" className={classes.cell_id}>PO Number</TableCell>
                        <TableCell align="right">Invoice Date</TableCell>
                        <TableCell align="right">Due Date</TableCell>
                        <TableCell align="right">Currency</TableCell>
                        <TableCell align="right">Open Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.responseDatas.map((data, index) => {
                            return (

                                <TableRow
                                    className={classes.tableBody}
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index}

                                >
                                    <TableCell padding="checkbox" >
                                    </TableCell>
                                    <TableCell component="th" scope="row" padding="none" >
                                        {data.invoiceId}
                                    </TableCell>
                                    <TableCell align="right">{data.poNumber}</TableCell>
                                    <TableCell align="right">{data.invoiceDate}</TableCell>
                                    <TableCell align="right">{data.dueInDate}</TableCell>
                                    <TableCell align="right">{data.currency}</TableCell>
                                    <TableCell align="right">{formatter(data.totalOpenAmount)}</TableCell>

                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>

        </TableContainer>
    );
}