import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DashboardIcon from "@mui/icons-material/Dashboard"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import StoreIcon from "@mui/icons-material/Store"
import InsertChartIcon from "@mui/icons-material/InsertChart"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"

import { Link } from 'react-router-dom'

export default function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Principal
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Información muy relevante
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                        Aliquam eget maximus est, id dignissim quam.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', margin: 'auto 0px', flexShrink: 0 }}>Listas</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Tablas que permiten enlistar los registros
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius quaerat esse ex nesciunt ipsam itaque, similique dolore vero, in voluptatem excepturi. Blanditiis necessitatibus temporibus pariatur repellendus, iusto molestiae earum! Impedit!
                    </Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Reportes
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Distintos Reportes
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Usuario</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}