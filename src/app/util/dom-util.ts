export const DomUtil = {
    isInitialPage: () => {
        // initial_page => 在<body>上設定的class
        const frameZones = Array.from(document.body.classList);
        frameZones.forEach((item) => {
            if (item === 'initial_page') {
                return true;
            }
        });
        return false;
    }
};
