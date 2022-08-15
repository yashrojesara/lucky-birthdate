import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    maxWidth: "50%",
    textAlign: "center",
  },
  result: {
    marginTop: "2em",
    fontWeight: "bold",
  },
});

function DateComponent() {
  const classes = useStyles();

  const [value, setValue] = React.useState(new Date());
  const [number, setNumber] = React.useState(0);
  const [lucky, setLucky] = React.useState(false);
  const [isButtonCLicked, setIsButtonClicked] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onClick = () => {
    setIsButtonClicked(true);
    if (number <= 0) {
      setMessage("Please enter a number greater than 0 !!!");
      return;
    }
    setMessage("");
    const sum = getSum();
    setLucky(sum % number === 0); // if sum is divisible by number then it is lucky
  };

  const getSum = () => {
    const date = value.toLocaleDateString();
    const sumOfDate = date.split("/").reduce((acc, curr) => {
      return acc + parseInt(curr);
    }, 0);

    const numArr = sumOfDate.toString().split("");

    const sum = numArr.reduce((a, b) => {
      return parseInt(a) + parseInt(b);
    }, 0);

    return sum;
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.text}>
        Is Your BirthDate Lucky?
      </Typography>
      <Typography
        variant="h6"
        className={classes.text}
        style={{ marginBottom: "1em", color: "darkblue" }}
      >
        (Note: We are not storing your data anywhere)
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="Select Birth-Date"
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <TextField
        style={{ margin: "1em 0em", minWidth: "16em" }}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        type="number"
        variant="outlined"
        label="Enter Your Lucky Number"
      />

      <Button onClick={onClick} variant="contained" color="primary">
        Check
      </Button>

      {isButtonCLicked &&
        (message ? (
          <span className={classes.result}>{message}</span>
        ) : (
          <>
            <span className={classes.result}>
              {`${"Your BirthDate is"} ${
                lucky ? "LUCKY 🥳🥳🥳" : "UNLUCKY 😔😔😔"
              }`}
            </span>
          </>
        ))}
    </div>
  );
}

export default DateComponent;
