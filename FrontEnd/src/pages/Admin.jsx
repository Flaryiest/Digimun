import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch} from '@mui/material'
import { styled } from '@mui/system'

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
    useEffect(() => {
        getCountryList()
        getCountriesInCommittee()
    }, [])

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
        const profilesWithCountry = committee.profiles.filter((profile) => profile.country != null) /// change clause
        console.log(committee.profiles)
        console.log(profilesWithCountry)
        setCountriesInCommittee(profilesWithCountry)
    }

    async function addCountryToCommittee() {
        const response = await fetch("http://localhost:3000/api/committee/countries", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
    }

    async function removeCountryFromCommittee() {
        const response = await fetch("http://localhost:3000/api/committee/countries", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
    }

    
      const handleToggle = (index, field) => (event) => {
       //const updatedCountries = [...countries];
       //updatedCountries[index][field] = event.target.checked;
       //setCountries(updatedCountries);
      };
    
      return (
        <StyledTableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>Country</StyledTableCell>
                <StyledTableCell>Present</StyledTableCell>
                <StyledTableCell>Voting</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countries.map((row, index) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )
}

export default Admin