'use strict'

const app = require('../index');
const { expect } = require('chai');
const request = require('supertest');
const Post = require('../models/post.model');

describe('api/posts', () => {

    const posts = [
        { author: '10', text: 'Content of the post' },
        { author: '11', text: 'My test post' }
    ];
    
    beforeEach(async () => {
        await Post.insertMany(posts);
    });

    afterEach(async () => {
        await Post.deleteMany({});
    });

    describe('GET', () => {
        it('should return all posts', async () => {
            const res = await request(app).get('/api/posts');
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
        });

        it('should return all posts for a specific author', async () => {
            const res = await request(app).get('/api/posts/10');
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(1);
        });

        it('should not return posts', async () => {
            const res = await request(app).get('/api/posts/12');
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(0);
        });
    });

    describe('POST', () => {
        it('should insert a new Post', async () => {
            let res = await request(app).post('/api/posts').send({ author: '12', text: 'My first post' }).set('Accept', 'application/json');
            expect(res.status).to.equal(201);
            res = await request(app).get('/api/posts');
            expect(res.body.length).to.equal(3);
        }); 
    });

    describe('PUT', () => {
        it('should update a Post for an author', async () => {
            let res = await request(app).post('/api/posts').send({ author: '13', text: 'My first post' }).set('Accept', 'application/json');
            expect(res.status).to.equal(201);
            res = await request(app).put(`/api/posts/${res.body.post._id}`).send({ author: '13', text: 'Updated post' }).set('Accept', 'application/json');
            expect(res.body.post.text).to.equal('Updated post');
        });

        it('should fail updating a post', async () => {
            let res = await request(app).post('/api/posts').send({ author: '14', text: 'My first post' }).set('Accept', 'application/json');
            expect(res.status).to.equal(201);
            res = await request(app).put(`/api/posts/${res.body.post._id}`).send({ author: '13', text: 'Updated post' }).set('Accept', 'application/json');
            expect(res.status).to.equal(403);
        });

        it('should do an upvote to a post', async () => {
            let res = await request(app).post('/api/posts').send({ author: '16', text: 'My first post' }).set('Accept', 'application/json');
            expect(res.status).to.equal(201);
            res = await request(app).put(`/api/posts/${res.body.post._id}/upvote`).send({ upvoter: '13' }).set('Accept', 'application/json');
            expect(res.body.post.upvoters.length).to.equal(1);
        });

        it('should not repeat an upvote to a post for the same author', async () => {
            let resNewPost = await request(app).post('/api/posts').send({ author: '17', text: 'My first post' }).set('Accept', 'application/json');
            expect(resNewPost.status).to.equal(201);
            let res = await request(app).put(`/api/posts/${resNewPost.body.post._id}/upvote`).send({ upvoter: '13' }).set('Accept', 'application/json');
            res = await request(app).put(`/api/posts/${resNewPost.body.post._id}/upvote`).send({ upvoter: '13' }).set('Accept', 'application/json');
            expect(res.body.post.upvoters.length).to.equal(1);
        });
    });

    describe('DELETE', () => {
        it('should delete a Post', async () => {
            let res = await request(app).post('/api/posts').send({ author: '15', text: 'My first post' }).set('Accept', 'application/json');
            expect(res.status).to.equal(201);
            res = await request(app).delete(`/api/posts/${res.body.post._id}`).send({ author: '15' }).set('Accept', 'application/json');
            expect(res.status).to.equal(200);
        }); 
    });

});