steps for mongodb setup.

1) install mongodb
2) run mongod service
3) start mongo in terminal console.
4) type command: "use ttt2ranks" 
5) type command: "exit"
6) import collection data with follow commands (replace testfolder\mongodb with folder you download mongodb\*.csv files)
   mongoimport -d ttt2ranks -c ranks --type csv --file C:\testfolder\mongodb\rangos.csv --headerline
   mongoimport -d ttt2ranks -c fighters --type csv --file C:\testfolder\mongodb\peleadores.csv --headerline



