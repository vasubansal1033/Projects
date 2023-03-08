package com.vasu.springbootgrpc;

import com.vasu.springbootgrpc.grpc.UserProto;
import com.vasu.springbootgrpc.grpc.userGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

public class GRPCClient {
    public static void main(String[] args) {
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress("localhost", 9090)
                .usePlaintext()
                .build();

        userGrpc.userBlockingStub userBlockingStub = userGrpc.newBlockingStub(channel);

        UserProto.LoginRequest loginRequest = UserProto.LoginRequest
                .newBuilder()
                .setUsername("vasubansal")
                .setPassword("password")
                .build();
        UserProto.APIResponse apiResponse = userBlockingStub.login(loginRequest);
        System.out.printf("Response code is: %s and Response message is %s", apiResponse.getResponseCode(), apiResponse.getResponsemessage());
    }
}
