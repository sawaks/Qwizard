//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//// NEEDS UPDATING!!!!!
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('quizzes');
            }

            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create(username, email, password);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { input }, context) => {
            const updatedBookUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
            );
            return updatedBookUser;
        },
        removeBook: async (parent, { bookId }, context) => {
            const updatedBookUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            return updatedBookUser;
        },
        addLeaderboard: async (parent, { quizId, points }, context) => {
            if (context.user) {
                User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { playedQuizzes: quiz._Id } },
                    {
                        new: true,
                        runValidators: true,
                    }
                )
                return Quiz.findOneAndUpdate(
                    { _id: quizId },
                    {
                        $addToSet: {
                            Leaderboards: { points, playerId: context.user._id },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;