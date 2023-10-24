--
-- Add a new record to the ConnectedApplication table
--
-- The Id column was originally created as an identity column, so we need to
-- change it to a normal column to ensure that we can assign the ID that we
-- want to match the enumerations.  Unfortunately, SQL Server does not allow
-- an existing column to have its identity property removed.  Instead, we have
-- to create a new table to replace the original one.
-- To make things extra fun, the Id column is a foreign key for the UserApplicationAccess
-- table, so we have to remove the foreign key contraint from that table
-- and add it back when we are done.
--

BEGIN TRANSACTION;

-- Remove the foreign key from UserApplicationAccess so we can manipulate the ConnectedApplication table
ALTER TABLE [dbo].[UserApplicationAccess] DROP CONSTRAINT [FK_UserApplicationAccess_ConnectedApplication];

-- Create a replacement table for ConnectedApplication
CREATE TABLE [dbo].[ConnectedApplication_New]
(
	[Id] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	CONSTRAINT [PK_ConnectedApplication_New] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
);

-- Move the data to the new table
ALTER TABLE [dbo].[ConnectedApplication] SWITCH TO [dbo].[ConnectedApplication_New];

-- Drop the original table
DROP TABLE [dbo].[ConnectedApplication];

-- Rename the new table to replace the old
EXEC sys.sp_rename 'dbo.ConnectedApplication_New', 'ConnectedApplication', 'OBJECT';
EXEC sys.sp_rename 'dbo.PK_ConnectedApplication_New', 'PK_ConnectedApplication', 'OBJECT';

-- Put the foreign key back
ALTER TABLE [dbo].[UserApplicationAccess] WITH CHECK
	ADD CONSTRAINT [FK_UserApplicationAccess_ConnectedApplication]
	FOREIGN KEY([ConnectedApplicationId]) REFERENCES [dbo].[ConnectedApplication] ([Id]);
ALTER TABLE [dbo].[UserApplicationAccess] CHECK CONSTRAINT [FK_UserApplicationAccess_ConnectedApplication];

-- Make sure the records match the enumeration
MERGE INTO [dbo].[ConnectedApplication] AS [dst]
USING
(
	VALUES
	(1, 'ProposalTracker'),
	(2, 'Projects'),
)
AS [src]([Id], [Name])
ON [dst].[Id] = [src].[Id]
WHEN MATCHED THEN
	UPDATE SET [Name] = [src].[Name]
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Id], [Name]) VALUES ([src].[Id], [src].[Name]);

COMMIT TRANSACTION;
--ROLLBACK TRANSACTION;
