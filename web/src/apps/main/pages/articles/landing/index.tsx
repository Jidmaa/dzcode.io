import { makeStyles, useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { FC } from "react";
import ListIcon from "@material-ui/icons/List";
import Typography from "@material-ui/core/Typography";
import articlesLanding from "src/apps/main/assets/svg/articles-landing.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  image: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "80%",
    maxWidth: "300px",
  },
  text: {
    padding: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(4),
  },
}));

interface LandingProps {
  onShowSidebar: () => void;
}

export const Landing: FC<LandingProps> = ({ onShowSidebar }) => {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div className={classes.root}>
      <img src={articlesLanding} className={classes.image} alt="Dzcode i/o: Articles" />
      <Typography className={classes.text}>
        Welcome to the articles section of Dzcode i/o
      </Typography>
      {md ? (
        <Typography className={classes.text}>👈 Please select from the left sidebar</Typography>
      ) : (
        <Button
          className={classes.button}
          startIcon={<ListIcon />}
          size="large"
          onClick={() => onShowSidebar()}
        >
          Articles list
        </Button>
      )}
    </div>
  );
};
