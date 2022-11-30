import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function CardMember({ member }) {
  return (
    <>
      <Card sx={{ width: 250, marginTop: 2, marginBottom: 2 }} variant="outlined">
        <CardContent>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
          >
            <Typography>{member.nama}</Typography>
            <Typography>{member.nim}</Typography>
          </Stack>
        </CardContent>
        <Divider light />
        <CardActions>
          <Button
            href={'https://github.com/' + member.username}
            startIcon={
              <IconButton color="dark">
                <GitHubIcon />
              </IconButton>
            }
            color="primary"
          >
            Visit GitHub
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
