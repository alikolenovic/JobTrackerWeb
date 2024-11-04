import { Table, TableBody, TableCell, TableRow } from "./table";

const IdTokensTable = ( TokenData: any ) => {
    const idTokenClaims = TokenData.idTokenClaims;
return (
        <Table aria-label="Tokens table">

            <TableBody>
                <TableRow> 
                    <TableCell align="left">Given Name</TableCell>
                    <TableCell align="left">{idTokenClaims.given_name}</TableCell>
                </TableRow>

                <TableRow> 
                    <TableCell align="left">City</TableCell>
                    <TableCell align="left">{idTokenClaims.city}</TableCell>
                </TableRow>

                <TableRow> 
                    <TableCell align="left">Job title</TableCell>
                    <TableCell align="left">{idTokenClaims.jobTitle}</TableCell>
                </TableRow>


                <TableRow> 
                    <TableCell align="left">Country</TableCell>
                    <TableCell align="left">{idTokenClaims.country}</TableCell>
                </TableRow>

            </TableBody>
          

        </Table>

    )
}

export default IdTokensTable