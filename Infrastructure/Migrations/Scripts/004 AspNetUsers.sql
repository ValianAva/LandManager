ALTER TABLE AspNetUsers ADD LastLogin datetime

ALTER TABLE AspNetUsers ADD IsDisabled bit NOT NULL DEFAULT(0)
GO