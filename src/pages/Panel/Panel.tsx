import React, { useCallback, useEffect, useState } from 'react';
import { HorizontalRule, Pill, Title } from '@thumbtack/thumbprint-react';

import Tack from '../../assets/img/logo.svg';
import { parsePayloadString } from '../utils/utils';
import { ignorePath, ignoreType } from './configs/config';
import {
  Container,
  CounterPill,
  DataContainer,
  DataHeader,
  DataText,
  Header,
  LogContainer,
} from './components/StyledComponents';
import './Panel.css';

interface PingData {
  name?: string;
  type: string;
  key: string;
  value: string;
}

type Ping = PingData[];

const Panel: React.FC = () => {
  const [pings, setPings] = useState<Ping[]>([]);
  const [pingCounter, setPingCounter] = useState<number[]>([]);

  const onRequestFinished = useCallback(
    (request) => {
      const { postData, headers } = request?.request ?? {};
      const { params } = postData ?? {}; // ping payload is in params
      const path = headers[2]?.value; // POST path
      const shouldIgnore = ignorePath.includes(path); // reduce noise from other pings

      if (params && !shouldIgnore) {
        const payload: Ping = [];

        params.forEach(({ name = '', value: payloadValue }: PingData) => {
          const value = parsePayloadString(payloadValue ?? '');
          const payloadArray = parsePayloadString(name).split(/\]\[|[[\]]/g);
          payloadArray.splice(0, 2);
          const [type, key] = payloadArray;

          !ignoreType.includes(type) && payload.push({ type, key, value });
        });

        const pingState = pings.map((ping) => JSON.stringify(ping));
        const existedPingIndex = pingState.indexOf(JSON.stringify(payload));
        const updatedPingCounter = pingCounter;
        if (existedPingIndex < 0) {
          updatedPingCounter.push(1);
          setPings((prevState) => [...prevState, payload]);
        } else {
          updatedPingCounter[existedPingIndex] =
            updatedPingCounter[existedPingIndex] + 1;
        }
        setPingCounter(updatedPingCounter);
      }
    },
    [pingCounter, pings]
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
        <Title size={3}>Tracking Tracker</Title>
      </Header>
      <LogContainer>
        {pings.map((ping, index) => {
          const pillText = pingCounter[index];
          return (
            <div key={`ping-${index}`}>
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
            </div>
          );
        })}
      </LogContainer>
    </Container>
  );
};

export default Panel;
