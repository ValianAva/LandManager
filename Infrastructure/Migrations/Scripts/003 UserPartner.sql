INSERT INTO [dbo].[AspNetRoles]
	(Id, Name, NormalizedName)
VALUES
	('b6fca5d1-f769-49e1-bf71-d470da5a0e0d', 'Partner', 'PARTNER') -- just a random guid Ross generated
GO

CREATE TABLE [dbo].[UserPartner]
(
	[UserId] [nvarchar](128) NOT NULL,
	[PartnerId] [int] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserPartner] ADD CONSTRAINT [PK_UserPartner] PRIMARY KEY CLUSTERED
(
	[UserId] ASC,
	[PartnerId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserPartner]
WITH CHECK ADD CONSTRAINT [FK_UserPartner_PartnerId] FOREIGN KEY([PartnerId])
REFERENCES [dbo].[Partner] ([Id])
GO

ALTER TABLE [dbo].[UserPartner] CHECK CONSTRAINT [FK_UserPartner_PartnerId]
GO

ALTER TABLE [dbo].[UserPartner]
WITH CHECK ADD  CONSTRAINT [FK_UserPartner_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO

ALTER TABLE [dbo].[UserPartner] CHECK CONSTRAINT [FK_UserPartner_UserId]
GO