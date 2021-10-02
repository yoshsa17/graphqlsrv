#!/bin/bash
cd src && find graphql/generated -type f -name "*.graphql" -exec cp {} ../dist/{} \;
