# logpump

Takes a local line separated file and pumps a max of N lines into a target file at a variable interval of min Y ms and max Z ms.

## No really, what is it?

This is a tool for taking lines from one file and pumping them into another file.

I used this to load log lines into Grafana's Loki so that I could simulate what Grafana and Loki would look like with "live" log data without having to install promtail on a server.

## Usage

```bash
Usage:
logpump [options] <file to read from> <file to write to>

Example:
logpump -n 3 --min 500 --max 1000 ./inlog.log ./outlog.log

Options:
    -n          Max log lines to write during a single interval. Will randomly pick between 1 and the value.
    --min       Minimum ms interval for log writing
    --max       Maximum ms interval for log writing
    -h, --help  This message
```

The `-n` option lets you define a maximum number of lines to write. Choosing a value of 5, for example, would randomly pick a number between 1 and 5 and write that many log lines for the interval. One long line will be written for each interval, even if this value is set to 0.

The `--min` and `--max` options define the minimum and maximum duration for a pause between log writes. The defaults are 500 and 1000 for the options.

## Example

```bash
logpump -n 10 --min 500 --max 1000 ./inlog.log ./outlog.log
```

This line will read up to 10 log lines from `inlog.log` and write them to the `outlog.log`. It will then pause for a random time between 500 and 1000ms before acting on the next batch of lines.
