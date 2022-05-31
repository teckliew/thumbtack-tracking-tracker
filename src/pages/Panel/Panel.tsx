import React, { useCallback, useEffect, useState } from 'react';
import { HorizontalRule, Pill, Title } from '@thumbtack/thumbprint-react';

import Tack from '../../assets/img/logo.svg';
import { parsePayloadString } from '../utils/utils';
import { allowedPath, ignorePath, ignoreType } from './configs/config';
import {
  Container,
  CounterPill,
  DataContainer,
  DataHeader,
  DataText,
  Header,
  LogContainer,
  PingContainer,
} from './components/StyledComponents';
import './Panel.css';

interface PingData {
  name?: string;
  type: string;
  key: string;
  value: string;
}

type Ping = PingData[];

const sanitizePayload = (input: []): Ping => {
  const payload: Ping = [];

  input.forEach(({ name = '', value: payloadValue }: PingData) => {
    const value = parsePayloadString(payloadValue ?? '');
    const payloadArray = parsePayloadString(name).split(/\]\[|[[\]]/g);
    payloadArray.splice(0, 2);
    const [type, key] = payloadArray;

    !ignoreType.includes(type) && payload.push({ type, key, value });
  });
  return payload;
};

const Panel: React.FC = () => {
  const [pings, setPings] = useState<Ping[]>([]);
  const [pingCounter, setPingCounter] = useState<number[]>([]);

  const onRequestFinished = useCallback(
    (request) => {
      const { postData, headers } = request?.request ?? {};
      const { params } = postData ?? {}; // ping payload is in params
      const path = headers[2]?.value; // POST path
      const shouldIgnore = ignorePath.includes(path); // reduce noise from other pings
      const shouldAllow = allowedPath.includes(path); // whitelisted urls

      if (params && !shouldIgnore && shouldAllow) {
        const payload: Ping = sanitizePayload(params);

        // compare if the current ping already exist in state
        const pingState = pings.map((ping) => JSON.stringify(ping));
        // find the index of the existing ping in state
        const existingPingIndex = pingState.indexOf(JSON.stringify(payload));
        if (existingPingIndex < 0) {
          // if there is no index, this is a new ping
          setPingCounter((prevState) => [1, ...prevState]);
          setPings((prevState) => [payload, ...prevState]);
        } else {
          // existing pings: reset the order so that the newest ping is on top
          setPings((prevState) => {
            const pingsState = [...prevState];
            const existingPing = pingsState.splice(existingPingIndex, 1);
            return [...existingPing, ...pingsState];
          });
          // existing pings: update the counter
          setPingCounter((prevState) => {
            const pingCounterState = [...prevState];
            const existingPingCounter = pingCounterState.splice(
              existingPingIndex,
              1
            );
            existingPingCounter[0] = existingPingCounter[0] + 1;
            return [...existingPingCounter, ...pingCounterState];
          });
        }
      }
    },
    [pings]
  );

  useEffect(() => {
    chrome.devtools.network.onRequestFinished.addListener(onRequestFinished);
    return () => {
      chrome.devtools.network.onRequestFinished.removeListener(
        onRequestFinished
      );
    };
  }, [onRequestFinished]);

  return (
    <Container>
      <Header>
        <Tack />
        <Title size={3}>Tracking Inspector</Title>
      </Header>
      <LogContainer>
        {pings.map((ping, index) => {
          const pillText = pingCounter[index];
          const pingContainerKey = `${index}-${JSON.stringify(pingCounter)}`;

          return (
            <PingContainer key={pingContainerKey} active={index === 0}>
              <CounterPill>
                <Pill>{`${pillText}`}</Pill>
              </CounterPill>
              {ping.map(({ type, key, value }, index) => {
                const isTitle = type === 'type';
                return (
                  <DataContainer key={`${type}-${index}`}>
                    {isTitle ? (
                      <DataHeader>
                        <Title size={8}>
                          {' '}
                          {key ? `${key} :: ${value}` : value}
                        </Title>
                      </DataHeader>
                    ) : (
                      <DataText>
                        {'>> '}
                        {key ? `${key} >> ${value}` : value}
                      </DataText>
                    )}
                  </DataContainer>
                );
              })}
              <HorizontalRule />
            </PingContainer>
          );
        })}
      </LogContainer>
    </Container>
  );
};

export default Panel;
