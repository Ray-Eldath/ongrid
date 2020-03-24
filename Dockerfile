FROM abiosoft/caddy:no-stats
LABEL maintainer="Ray Eldath <ray.eldath@outlook.com>"
COPY Caddyfile /etc/Caddyfile
COPY dist /srv/
EXPOSE 80