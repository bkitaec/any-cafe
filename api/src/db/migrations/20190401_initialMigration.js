'use strict';

export default {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable(
          'users',
          {
            /**
             * general fields
             */
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            socialNetwork: {
              type: Sequelize.STRING,
              unique: 'socialNetwork',
            },
            email: {
              type: Sequelize.STRING,
              allowNull: true,
              unique: true,
            },
            phone: {
              type: Sequelize.STRING,
              allowNull: true,
              unique: true,
            },
            password: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            /**
             * user fields
             */
            avatar: {
              type: Sequelize.STRING,
            },
            cover: {
              type: Sequelize.STRING,
            },
            firstName: {
              type: Sequelize.STRING,
            },
            lastName: {
              type: Sequelize.STRING,
            },
            birthday: {
              type: Sequelize.DATE,
              allowNull: true,
            },
            gender: {
              type: Sequelize.ENUM('unknown', 'male', 'female'), // eslint-disable-line new-cap
              defaultValue: 'unknown',
            },
            country: {
              type: Sequelize.STRING,
              defaultValue: null,
              allowNull: true,
            },
            city: {
              type: Sequelize.STRING,
              defaultValue: null,
              allowNull: true,
            },
            biography: {
              type: Sequelize.TEXT,
              defaultValue: null,
              allowNull: true,
            },
            activity: {
              type: Sequelize.INTEGER,
              defaultValue: null,
              allowNull: true,
            },
            mainLanguage: {
              type: Sequelize.STRING,
              defaultValue: null,
              allowNull: true,
            },
            favoritePlaces: {
              type: Sequelize.STRING,
              defaultValue: null,
              allowNull: true,
            },
            places: {
              type: Sequelize.STRING,
              defaultValue: null,
              allowNull: true,
            },

            /**
             * system fields
             */
            subscribe: {
              type: Sequelize.BOOLEAN,
              defaultValue: false,
            },
            diskSpaceAvailable: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            diskSpaceUsage: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
              allowNull: false,
            },
            accountName: {
              type: Sequelize.STRING,
              unique: true,
            },
            resetToken: {
              type: Sequelize.STRING,
              unique: true,
            },
            lastVisitedAt: {
              type: Sequelize.DATE,
            },

            /**
             * count fields
             */
            followersCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            tracksPublishedCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            tracksUnpublishedCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            albumsPublishedCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            albumsUnpublishedCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            playlistTracksCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            downloadsCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            listensCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            photosCount: {
              type: Sequelize.INTEGER,
              defaultValue: 0,
            },
            /**
             * contact fields
             */
            website: {
              type: Sequelize.STRING,
            },
            skype: {
              type: Sequelize.STRING,
            },
            facebookLink: {
              type: Sequelize.STRING,
            },
            googleLink: {
              type: Sequelize.STRING,
            },
            instagramLink: {
              type: Sequelize.STRING,
            },
            twitterLink: {
              type: Sequelize.STRING,
            },
            telegramLink: {
              type: Sequelize.STRING,
            },
            viberLink: {
              type: Sequelize.STRING,
            },
            whatsAppLink: {
              type: Sequelize.STRING,
            },
            phoneNumberFirst: {
              type: Sequelize.STRING,
            },
            phoneNumberSecond: {
              type: Sequelize.STRING,
            },
            recordLabel: {
              type: Sequelize.STRING,
            },
            manager: {
              type: Sequelize.STRING,
            },
            bookingAgent: {
              type: Sequelize.STRING,
            },
            perfomanceDuration: {
              type: Sequelize.INTEGER,
            },
            honorarium: {
              type: Sequelize.INTEGER,
            },

            createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
            },

            /**
             * Deletion fields
             */
            deletionReasonId: {
              type: Sequelize.INTEGER,
              references: {
                model: 'deletionReasons',
                key: 'reasonId',
              },
              onUpdate: 'cascade',
              onDelete: 'SET NULL',
            },

            deletionReasonText: {
              type: Sequelize.TEXT,
            },

            deletedAt: {
              type: Sequelize.DATE,
            },
          },
          {
            uniqueKeys: {
              compositeSocialNetworkIndex: {
                fields: ['socialNetworkAccountId', 'socialNetworkName'],
              },
            },
          }
        )
      )
      .then(() =>
        queryInterface.createTable('tokens', {
          tokenId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
          },
          accessToken: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          expiredAt: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('Sessions', {
          sid: {
            type: Sequelize.STRING,
            primaryKey: true,
          },
          expires: Sequelize.DATE,
          data: Sequelize.TEXT,
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('tracks', {
          /**
           * general fields
           */
          trackId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          audioalbumId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
          },
          userId: {
            type: Sequelize.INTEGER,
          },
          fileName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          fileSize: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          type: {
            type: Sequelize.ENUM('track', 'remix', 'mix', 'album'), // eslint-disable-line new-cap
            defaultValue: 'track',
          },

          /**
           * track fields
           */
          artistName: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Untitled',
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Untitled',
          },
          originalName: {
            type: Sequelize.STRING,
          },
          peaks: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          style: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },
          subStyle: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },
          duration: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
          },
          bpm: {
            type: Sequelize.STRING,
          },
          dmca: {
            type: Sequelize.STRING,
          },
          tonality: {
            type: Sequelize.STRING,
          },
          cover: {
            type: Sequelize.STRING,
          },
          background: {
            type: Sequelize.STRING,
          },
          status: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          description: {
            type: Sequelize.TEXT,
          },
          keywords: {
            type: Sequelize.TEXT,
          },
          labelSigned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          label: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true,
          },
          format: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true,
          },

          /**
           * track date fields
           */
          recordDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null,
          },

          publishDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null,
          },

          /**
           * spread fields
           */
          spreadType: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },
          honorarium: {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: null,
          },
          currencyId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
          },

          /**
           * position fields
           */
          positionInAlbum: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },

          /**
           * count fields
           */
          tracksCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          commentsCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          repostsCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          downloadsCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          listensCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },

          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('statisticDownloads', {
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          trackId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'tracks',
              key: 'trackId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('statisticTrackListen', {
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          trackId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'tracks',
              key: 'trackId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('statisticSpread', {
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          trackId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'tracks',
              key: 'trackId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          spreadType: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },
          spreadURL: {
            type: Sequelize.STRING,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('statisticTrackVerified', {
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          trackId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'tracks',
              key: 'trackId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('playlists_tracks', {
          userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          trackId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'tracks',
              key: 'trackId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          orderNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('followers', {
          userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
          },
          followerId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('comments', {
          /**
           * general fields
           */
          commentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },

          userId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
          },

          repliedCommentId: {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true,
          },

          commentable: Sequelize.STRING,
          commentableId: Sequelize.INTEGER,

          /**
           * comment fields
           */
          content: Sequelize.STRING,

          /**
           * count fields
           */
          likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },

          /**
           * Time fields
           */
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('likes', {
          likeable: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
          },
          likeableId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('news', {
          newsId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          postDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          image: {
            type: Sequelize.STRING,
          },
          metaTitle: {
            type: Sequelize.STRING,
          },
          metaDescription: {
            type: Sequelize.STRING,
          },
          metaKeywords: {
            type: Sequelize.STRING,
          },
          annotation: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          content: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('pages', {
          pageId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          label: {
            type: Sequelize.STRING,
            unique: true,
          },
          metaTitle: {
            type: Sequelize.STRING,
          },
          metaDescription: {
            type: Sequelize.STRING,
          },
          metaKeywords: {
            type: Sequelize.STRING,
          },
          content: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('messages', {
          messageId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          dialogId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          textMessage: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          sender: {
            type: Sequelize.INTEGER,
            min: 1,
            references: {
              model: 'users',
              key: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          readStatus: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          postDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('photos', {
          photoId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          photoalbumId: {
            type: Sequelize.INTEGER,
          },
          userId: {
            type: Sequelize.INTEGER,
          },
          fileName: {
            type: Sequelize.STRING,
          },
          description: {
            type: Sequelize.TEXT,
          },
          status: {
            type: Sequelize.INTEGER,
          },
          commentsCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          repostsCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('dialogs', {
          dialogId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          sender: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          reciever: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('support', {
          supportId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          topic: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          questionTypeId: Sequelize.INTEGER,
          isReply: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('photoalbums', {
          photoalbumId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          albumName: {
            type: Sequelize.STRING,
          },
          userId: {
            type: Sequelize.INTEGER,
          },
          description: {
            type: Sequelize.TEXT,
          },
          photoCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          cover: {
            type: Sequelize.STRING,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('fee', {
          feeId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('residents', {
          residentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('residents_rus', {
          rusId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          residentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          type: {
            type: Sequelize.ENUM('artist', 'label', 'promoter'), // eslint-disable-line new-cap
            defaultValue: 'artist',
          },
          fullName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          dateOfBirth: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          city: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          address: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          passportNum: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          whereIssued: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          whenIssued: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          inn: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          mainImage: {
            type: Sequelize.STRING,
          },
          addressImage: {
            type: Sequelize.STRING,
          },
          innImage: {
            type: Sequelize.STRING,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('residents_usa', {
          usaId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          residentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          type: {
            type: Sequelize.ENUM('artist', 'label', 'promoter'), // eslint-disable-line new-cap
            defaultValue: 'artist',
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          businessName: {
            type: Sequelize.STRING,
          },
          country: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          address: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          city: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          state: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          zipcode: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          tax: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          ssn: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          ein: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          mainImage: {
            type: Sequelize.STRING,
          },
          addressImage: {
            type: Sequelize.STRING,
          },
          innImage: {
            type: Sequelize.STRING,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('residents_other', {
          otherId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          residentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          type: {
            type: Sequelize.ENUM('artist', 'label', 'promoter'), // eslint-disable-line new-cap
            defaultValue: 'artist',
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          mainImage: {
            type: Sequelize.STRING,
          },
          addressImage: {
            type: Sequelize.STRING,
          },
          innImage: {
            type: Sequelize.STRING,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('fee_rusbank', {
          rusBankId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          feeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          bankName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          bic: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          corrAccount: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          account: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('fee_webmoney', {
          webmoneyId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          feeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('fee_paypall', {
          paypalId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          feeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      )
      .then(() =>
        queryInterface.createTable('fee_bankcard', {
          bankCardId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          feeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        })
      ),

  down: (queryInterface, Sequelize) => queryInterface.dropAllTables(),
};
