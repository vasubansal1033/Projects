const { expect } = require('expect');
const { describe, it } = require('node:test');
const { generateMessage, generateLocMessage } = require('./message');

describe("generate message", () => {
    it("should generate correct message", () => {
        let from = "Vasu",
            text = "Hello sir!",
            message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })
})

describe("generate location message", () => {
    it("should generate correct location message", () => {
        let from = "Vasu",
            lat = 35,
            long = 40,
            message = generateLocMessage(from, lat, long)

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url: `https://www.google.com/maps?q=35,40`});
    })
})