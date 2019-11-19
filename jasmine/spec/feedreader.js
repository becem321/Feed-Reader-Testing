$(function() {
    /* TEST SUITE 1
     * "RSS Feed" 
     */
    describe('RSS Feeds', function() {
        /* TEST 1.A
         * tests the allFeeds variable 
         * to be defined and not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TEST 1.B
         * tests a URL to be defined
         * and not empty.
         */
        it('have in each feed a defined url', function() {
            for (let i in allFeeds) {
                expect(allFeeds[i].url).toBeDefined();
                expect(typeof allFeeds[i].url).toBe('string');
                expect(allFeeds[i].url).not.toBe('');
            };
        });

        /* TEST 1.C
         * tests a name to be defined
         * and not empty.
         */
        it('have in each feed a defined name', function() {
            for (let j in allFeeds) {
                expect(allFeeds[j].name).toBeDefined();
                expect(typeof allFeeds[j].name).toBe('string');
                expect(allFeeds[j].name).not.toBe('');
            };
        });
    });

    /* TEST SUITE 2
     * "The menu"
     */
    describe('The menu', function() {
        /* TEST 2.A
         * tests the menu element 
         * to be hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TEST 2.B
         * tests the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility when is clicked', function() {
            let menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TEST SUITE 3
     * "Initial Entries"
     */
    describe('Initial Entries', function() {
        /* TEST 3.A
         * tests the loadFeed function to be
         * called and completes its work, with at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least 1 entry', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* TEST SUITE 4
     * "New Feed Selection"
     */
    describe('New Feed Selection', function() {
        /* TEST 4.A
         * tests the content to be changed
         * when a new feed is loaded
         * by the loadFeed function.
         */   
        let prevFeedData,
            newFeedData;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // Load and store previous Feed data
                prevFeedData = $('.feed').html();

                loadFeed(1, function(){
                    // Load and store new Feed data
                    newFeedData= $('.feed').html();
                    // Start tests
                    done();
                });
            });
        });

        it('has a different content than previous one', function() {
            expect(prevFeedData).not.toBe(newFeedData);
        });
    });
}());
