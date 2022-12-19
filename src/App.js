import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import Password from '@mui/icons-material/Password';
import Datastore from 'nedb'



export default function App() {
    const [allData, setAllData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [filter, setFilter] = React.useState('domain');
    const [formData, setFormData] = React.useState({ _id: null, domain: "", username: "", password: "" })
    const [searchVal, setSearchVal] = React.useState('');
    const db = new Datastore({ filename: 'test.db', autoload: true, timestampData: true });
    const refreshTable = () => {
        db.find({}, function (err, docs) {
            console.log(docs);
            setAllData(docs);
            setFilteredData(docs.slice(0,10));
        });
    }
    React.useEffect(() => {
        refreshTable();
    }, [])
    // refreshTable()

    const booyahSearch = (searchValue) => {
        const isSubsequence = (s2) => {
            s2 = s2[filter]
            let s1 = searchValue;
            let n = s1.length, m = s2.length;
            let i = 0, j = 0;
            while (i < n && j < m) {
                if (s1[i] === s2[j])
                    i++;
                j++;
            }
            return i === n;
        }
        let tempFilteredData = allData.filter(isSubsequence)
        setFilteredData(tempFilteredData.slice(0,5));
    }
    const handleInput = (e) => {
        setSearchVal(e.target.value);
        if (e.target.value.length === 0) {
            setFilteredData(allData.slice(0,5))
            console.log("empty");
        } else {
            console.log("values");
            booyahSearch(e.target.value)
        }
    }
    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            setFilter(newFilter);
            if (searchVal.length === 0) {
                setFilteredData(allData.slice(0, 5))
                console.log("empty");
            } else {
                console.log("values");
                booyahSearch(searchVal)
            }
        }
        
    };
    const handleClick = (e) => {
        if (formData._id) {
            db.update({ _id: formData._id }, {
                $set: {
                    domain: formData.domain,
                    username: formData.username,
                    password: formData.password
                }
            })
        } else {
            db.insert({
                domain: formData.domain,
                username: formData.username,
                password: formData.password
            })
        }
        refreshTable()
    }

    const BasicTable = () => {
        return (
            <TableContainer component={ Paper }>
                <Table sx={ { minWidth: 450 } } aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Domain</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { filteredData.map((row) => (
                            <TableRow
                                key={ row._id }
                                sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                            >
                                <TableCell component="th" scope="row">
                                    { row.domain }
                                </TableCell>
                                <TableCell align="right"><Chip
                                    label={ row.username }
                                    onDelete={ () => { navigator.clipboard.writeText(row.username) } }
                                    deleteIcon={ <ContentCopyIcon /> }
                                    variant="outlined"
                                /></TableCell>
                                <TableCell align="right"><Chip
                                    label={ '*'.repeat(row.password.length) }
                                    onDelete={ () => { navigator.clipboard.writeText(row.password) } }
                                    deleteIcon={ <ContentCopyIcon /> }
                                    variant="outlined"
                                /></TableCell>
                                <TableCell align="right"><IconButton onClick={ () => setFormData({ _id: row._id, domain: row.domain, username: row.username, password: row.password }) }><EditIcon color='primary' /></IconButton></TableCell>
                                <TableCell align="right"><IconButton onClick={ () => {
                                    db.remove({ _id: row._id });
                                    refreshTable()
                                } }><DeleteIcon color='primary' /></IconButton></TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <Box sx={ { width: '100%' } }>
            <Grid container rowSpacing={ 1 } columnSpacing={ { xs: 1, sm: 2, md: 3 } }>
                <Grid item xs={ 12 }>
                    <div className='container'>
                        <div className='input-wrap'>
                            <i className="fas fa-search"></i>
                            <input
                                onChange={ handleInput }
                                value={ searchVal }
                                type="text"
                                name="product-search"
                                id="product-search"
                                placeholder="Search Credentials"
                            />
                            <ToggleButtonGroup
                                color="primary"
                                value={ filter }
                                exclusive
                                onChange={ handleFilterChange }
                                aria-label="Platform"
                            >
                                <ToggleButton value="domain"><LanguageIcon fontSize='small'/></ToggleButton>
                                <ToggleButton value="username"><PersonIcon fontSize='small'/></ToggleButton>
                                <ToggleButton value="password"><Password fontSize='small'/></ToggleButton>
                            </ToggleButtonGroup>

                        </div>
                        <div className='intakeForm'>
                            <TextField id="outlined-basic" label="Domain" variant="outlined" value={ formData.domain } onChange={ (e) => { setFormData(formData => { return { ...formData, domain: e.target.value } }) } } />
                            <TextField id="outlined-basic" label="Username" variant="outlined" value={ formData.username } onChange={ (e) => { setFormData(formData => { return { ...formData, username: e.target.value } }) } } />
                            <TextField id="outlined-basic" label="Password" variant="outlined" value={ formData.password } onChange={ (e) => { setFormData(formData => { return { ...formData, password: e.target.value } }) } } />
                        </div>
                        <div className='intakeAction'>
                            <Button variant="contained" size="large" onClick={ handleClick }>
                                Submit
                            </Button>
                            <Button variant="contained" color='secondary' size="large" onClick={ (e) => setFormData({ _id: null, domain: "", username: "", password: "" }) }>
                                Reset
                            </Button>
                        </div>
                        <BasicTable db={ db } setFormData={ setFormData } filteredData={ filteredData } />
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
