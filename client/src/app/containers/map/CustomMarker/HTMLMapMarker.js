import './CustomMarker.css';

const createHTMLMapMarker = ({ maps, ...args }) => {
    class HTMLMapMarker extends maps.OverlayView {
        constructor() {
            super();
            this.position = args.position;
            this.animation = args.animation;
            this.html = args.html;
            this.setMap(args.map);
        }

        createDiv() {
            this.div = document.createElement('div');
            this.div.style.position = 'absolute';
            this.div.className = 'customMarker';
            if (this.html) {
                this.div.innerHTML = this.html;
            }

            const self = this;
            maps.event.addDomListener(this.div, 'click', function(e) {
                if (e.placeId) {
                    e.stop();
                }
                maps.event.trigger(self, 'click', e);
            });
            maps.event.addDomListener(this.div, 'dblclick', (e) => {
                if (e.placeId) {
                    e.stop();
                }
                maps.event.trigger(this, 'dblclick', e);
            });
            maps.event.addDomListener(this.div, 'touchend', (e) => {
                if (e.placeId) {
                    e.stop();
                }
                maps.event.trigger(this, 'touchend', e);
            });
            // this.getPanes().overlayMouseTarget.appendChild(this.div);
            // this.getPanes().overlayLayer.appendChild(this.div);
            this.getPanes().floatPane.appendChild(this.div);
        }

        positionDiv() {
            const point = this.getProjection().fromLatLngToDivPixel(this.position);
            if (point) {
                this.div.style.left = `${point.x}px`;
                this.div.style.top = `${point.y}px`;
            }
        }

        draw() {
            if (!this.div) {
                this.createDiv();
            }
            this.positionDiv();
        }

        remove() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                this.div = null;
            }
        }

        getPosition() {
            return this.position;
        }

        getDraggable() {
            return false;
        }

        setAnimation(animation) {
            this.animation = animation;
        }
        getAnimation() {
            return this.animation;
        }
    }

    return new HTMLMapMarker();
};

export default createHTMLMapMarker;
