import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton, Autocomplete, TextField} from '@mui/material'
import { styled } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    marginTop: '10dvh',
  }));
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
    fontSize: '14px',
  }));
  
  const StyledSwitch = styled(Switch)(({ theme }) => ({
    transform: 'scale(0.8)',
    transitionDuration: '50ms',
  }));


function Admin() {
    const params = useParams()
    const [countries, setCountries] = useState([])
    const [countriesInCommittee, setCountriesInCommittee] = useState([])
    const [rerender, triggerRender] = useState(0)
    useEffect(() => {
        getCountryList()
    }, [])

    useEffect(() => {
        getCountriesInCommittee()
    }, [rerender])

    function sortCountries( a, b ) {
        if (a.id > b.id) {
            return -1
        }
        else if (a.id < b.id) {
            return 1
        }
        return 0
    }

    async function getCountryList() {
        const response = await fetch("http://localhost:3000/api/countries", {
            method: "GET",
            credentials: 'include',
        })
        const countries = await response.json()
        console.log(countries)
        setCountries(countries)
    }

    async function getCountriesInCommittee() {
        const response = await fetch("http://localhost:3000/api/committee", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
        const committee = await response.json()
        const profilesWithCountry = committee.profiles.filter((profile) => profile.country != null)
        console.log(committee.profiles)
        console.log(profilesWithCountry)
        profilesWithCountry.sort(sortCountries)
        setCountriesInCommittee(profilesWithCountry)
    }

    const handleToggle = (index, field) => async (event) => {
        console.log(index, field, event.target.checked)
        const response = await fetch("http://localhost:3000/api/committee/countries/toggle", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({profileID: countriesInCommittee[index].id, field: field, status: event.target.checked})
        })
        if (response.status == 200) {
            triggerRender(prevState => prevState + 1)
        }
        else {
            console.log("toggle failed")
        }
    }
    
    const handleDelete = (index) => async () => {
        const response = await fetch("http://localhost:3000/api/committee/countries/remove", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID, profileID: countriesInCommittee[index].id})
        })
        if (response.status == 200) {
            triggerRender(prevState => prevState + 1)
        }
        else {
            console.log("delete profile failed")
        }
    }


    const handleAddCountry = async (row) => {
        const response = await fetch("http://localhost:3000/api/committee/countries/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID, country: row.country, countryCode: row.code})
        })
        if (response.status == 200) {
            triggerRender(prevState => prevState + 1)
        }
        else {
            console.log("add country failed")
        }
    }
    
      return (
        <StyledTableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Autocomplete
                                options={countries.map((row) => row.country)}
                                onChange={(event, newValue) => {
                                    const selectedCountry = countries.find(country => country.country === newValue);
                                    handleAddCountry(selectedCountry);
                                }}
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        label="Add A Country"
                                        variant="outlined"
                                        size="small"
                                        InputProps={{
                                            ...params.InputProps,
                                            style: { fontSize: '14px' }
                                        }}
                                        InputLabelProps={{
                                            style: { fontSize: '14px' }
                                        }}
                                        sx={{ padding: '0px' }}
                                    />
                                )}
                                fullWidth
                                size="small"
                                disablePortal
                                ListboxProps={{
                                    style: { maxHeight: 300, maxWidth: 300, fontSize: '14px' },
                                }}
                            />
                        </StyledTableCell>
                        <StyledTableCell>Present</StyledTableCell>
                        <StyledTableCell>Voting</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countriesInCommittee.map((row, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{row.country}</StyledTableCell>
                            <StyledTableCell>
                                <StyledSwitch
                                    checked={Boolean(row.present)}
                                    onChange={handleToggle(index, 'present')}
                                    color="primary"
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <StyledSwitch
                                    checked={Boolean(row.voting)}
                                    onChange={handleToggle(index, 'voting')}
                                    color="primary"
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <IconButton onClick={handleDelete(index)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
      )
}

export default Admin