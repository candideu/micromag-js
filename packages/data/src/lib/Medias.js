import Base from './Base';

class MediasApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'medias',
                show: 'medias/:media',
                store: 'medias',
                update: 'medias/:story',
                delete: 'medias/:story',
                ...(opts.routes || null),
            },
        });
    }

    find(id) {
        return this.requestGet(
            this.route('show', {
                media: id,
            }),
        );
    }

    get(query = {}, page = 1, count = 10) {
        const finalQuery = {
            ...query,
        };
        if (page !== null) {
            finalQuery.page = page;
        }
        if (count !== null) {
            finalQuery.count = count;
        }
        return this.requestGet(this.route('index'), finalQuery);
    }

    create(data) {
        return this.requestPost(this.route('store'), data);
    }

    update(id, data) {
        return this.requestPost(
            this.route('update', {
                story: id,
            }),
            data,
        );
    }

    delete(id) {
        return this.requestDelete(
            this.route('delete', {
                story: id,
            }),
        );
    }
}

export default MediasApi;