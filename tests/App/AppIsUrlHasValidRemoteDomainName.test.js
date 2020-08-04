const app = require('../../source/app');

describe('test isUrlHasValidRemoteDomainName method', () => {

	it('if valid domain', () => {

		const url = 'https://example.com/test';

		expect(app.isUrlHasValidRemoteDomainName(url)).toBeTruthy();
	});

	it('if valid domain with numbers', () => {

		const url = 'https://1.1.1.1.com/test';

		expect(app.isUrlHasValidRemoteDomainName(url)).toBeTruthy();
	});

	it('if hostname is ip4 address', () => {

		const url = 'https://1.1.1.1/test';

		expect(app.isUrlHasValidRemoteDomainName(url)).toBeFalsy();
	});

	it('if valid http domain', () => {

		const url = 'http://example.com/test';

		expect(app.isUrlHasValidRemoteDomainName(url)).toBeTruthy();
	});

	it('if hostname is ip6 address', () => {

		const url = 'https://2606:4700:4700::1111/test';

		expect(app.isUrlHasValidRemoteDomainName(url)).toBeFalsy();
	});

	it('if hostname localhost', () => {

		const url = 'https://localhost/test';

		expect(app.isUrlHasValidRemoteDomainName(url)).toBeFalsy();
	});

	it('if protocol is ftp', () => {

		const url = 'ftp://example.com/test';

		expect(app.isUrlHasValidRemoteDomainName(url)).toBeFalsy();
	});
});
